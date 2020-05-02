import { lambda } from 'nice-lambda';
import awsSdk from 'aws-sdk';
import { CognitoUserPoolTriggerEvent } from 'aws-lambda';

const cognitoIdp = new awsSdk.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

exports.handler = lambda(async (call) => {
	const event = call.event as CognitoUserPoolTriggerEvent;
	console.log(`Cognito pre-signup handler event: ${JSON.stringify(event, null, 2)}`);
	const { email } = event.request.userAttributes;
	const params = {
		UserPoolId: event.userPoolId,
		Filter: `email = "${email}"`,
	};
	console.log(`Searching for users with email '${email}'`);
	const result = await cognitoIdp.listUsers(params).promise();
	console.log(`Result: ${JSON.stringify(result, null, 2)}`);
	const users = result.Users;
	if (!users) {
		console.error('No users list found in result of listUsers');
		throw new Error('Unexpected server error while processing sign-up');
	}
	if (users.length > 0 && users[0].Username !== event.userName) {
		console.log(`Email address ${email} is already assigned to user ${users[0].Username}`);
		throw new Error('A user with that email address already exists');
	}
	console.log(`Email address ${email} is not yet in use. Approving sign-up.`);
	return event;
});
