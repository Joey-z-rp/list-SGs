import { APIGatewayTokenAuthorizerEvent, Handler } from 'aws-lambda';

export const authorizeRequest: Handler<APIGatewayTokenAuthorizerEvent> = async event => {
  const { authorizationToken } = event;

  const policyDocument = {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Action: 'execute-api:Invoke',
        Resource: '*',
      },
    ],
  };

  /**
   * For simplicity sake, it checks a static token here.
   * In a real project, it should use a reliable authentication mechanism, e.g JWT token.
   */
  const token = process.env.AUTH_TOKEN;
  const isValidToken = authorizationToken === `Bearer ${token}`;

  if (isValidToken) {
    return { policyDocument };
  }

  throw new Error('Unauthorized');
};
