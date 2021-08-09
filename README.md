# List All Your Security Groups

This project is using Infrastructure As Code approach to create an API service to list all the security groups in an AWS account. It uses AWS Lambda as backend integration and exposes the endpoint through API Gateway. The endpoint is secured by a custom API Gateway Lambda Authorizer.

## Frameworks / Tools

- Serverless framework
- Typescript
- Jest
- ESLint

## Available Scripts

In the project directory, you can run:

### `yarn lint`

Runs lint and prettier check.

### `yarn lint:fix`

Runs lint and prettier check and auto-fix any errors.

### `yarn test`

Runs all the unit tests.

### `yarn test:coverage`

Runs all the unit tests and produce a coverage report. The report is available under the `coverage` folder in the root directory.

### `yarn deploy`

Transpile the typescript code and deploy all the AWS services. To successfully run this command, you will need to set up AWS credentials. The associated AWS role/user needs to have sufficient permissions to deploy the services. Refer to [AWS - Credentials](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/) for detailed instructions.

## Considerations / Improvements

- For simplicity sake, the authorizer checks the token against an environment variable to determine whether to grant access. In a real project, it should use a proper authentication solution, such as JWT token.
- While the Lambda runtime has `aws-sdk` already, I made it as one of the dependencies. This is because I want to have an explicit and fixed version of the sdk in the code base so there is no surprises from unintended version upgrade. This can be improved by having a particular version of `aws-sdk` in the Lambda dependency layer so the sdk doesn't need to be bundled into each handler.
- Since the scope of this application is fairly limited, I didn't set up serverless-offline. In a bigger project, it should be used to facilitate local development
- I didn't use `aws-sdk-mock` in the unit tests because it requires the Lambda handlers to be writtern in a certain way, e.g the sdk service instantiation must be done inside the handler. In my opinion, a test utility should not dictate how the production code is written. For example, we want to instantiate the service outside the handler so it can be reused for subsequent invocations.
- Husky can be used to add commit hooks so linter and prettier will be run for every commit
- Better/stricter types
- Better JSON:API 1.0 compliance, e.g, respond with particular status code if incorrect request headers present
