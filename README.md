# nice-lambda-example

Here's a real-world use case for `nice-lambda`, a Cognito User Pools
pre-signup hook which prevents users from signing up with an email
address that is already in use by another user.

To build it, run `./build.sh` from the root of this project, and
it will make a zip file that's ready to be uploaded for an AWS
Lambda function.
