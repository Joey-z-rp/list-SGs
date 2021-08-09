import { APIGatewayTokenAuthorizerEvent, Context } from 'aws-lambda';
import { authorizeRequest } from './authorize-request';

const AUTH_TOKEN = 'my-auth-token';

beforeAll(() => {
  process.env.AUTH_TOKEN = AUTH_TOKEN;
});

afterAll(() => {
  process.env.AUTH_TOKEN = undefined;
});

describe('authorizeRequest', () => {
  const setup = (token: string) => {
    const event = { authorizationToken: `Bearer ${token}` } as APIGatewayTokenAuthorizerEvent;

    return authorizeRequest(event, {} as Context, jest.fn());
  };

  it('should return the correct policy document if the token is valid', async () => {
    const result = await setup(AUTH_TOKEN);
    const expectedResult = {
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: 'execute-api:Invoke',
            Resource: '*',
          },
        ],
      },
    };

    expect(result).toEqual(expectedResult);
  });

  it('should throw error if the token is invalid', () => {
    const expectedError = new Error('Unauthorized');

    expect(setup('invalid-token')).rejects.toEqual(expectedError);
  });
});
