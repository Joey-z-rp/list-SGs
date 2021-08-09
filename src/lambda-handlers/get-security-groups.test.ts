import { Context } from 'aws-lambda';
import { JSON_CONTENT_TYPE } from './constants';
import { getAllSecurityGroups } from './get-security-groups';
import { mappedSecurityGroup, rawSecurityGroup } from '../../fixtures/security-groups';

const mockDescribeRegions = jest.fn();
const mockDescribeSecurityGroups = jest.fn();

jest.mock('aws-sdk', () => ({
  config: {
    update: jest.fn(),
  },
  EC2: jest.fn(() => ({
    describeRegions: () => ({
      promise: () => mockDescribeRegions(),
    }),
    describeSecurityGroups: () => ({
      promise: () => mockDescribeSecurityGroups(),
    }),
  })),
}));

beforeEach(() => {
  mockDescribeRegions.mockReset();
  mockDescribeSecurityGroups.mockReset();
});

describe('getAllSecurityGroups', () => {
  it('should get all security groups in an account', async () => {
    mockDescribeRegions.mockImplementation(() => ({ Regions: [{ RegionName: 'ap-southeast-2' }] }));
    mockDescribeSecurityGroups.mockImplementation(() => ({ SecurityGroups: [rawSecurityGroup] }));

    const expectedResult = {
      body: JSON.stringify({ data: [mappedSecurityGroup] }),
      headers: { 'Content-Type': JSON_CONTENT_TYPE },
      statusCode: 200,
    };
    const result = await getAllSecurityGroups({}, {} as Context, jest.fn());

    expect(result).toEqual(expectedResult);
  });

  it('should response with error information', async () => {
    mockDescribeRegions.mockImplementation(() => ({ Regions: [] }));

    const expectedResult = {
      body: JSON.stringify({
        errors: [
          {
            detail: 'Failed to fetch regions',
            title: 'Internal Server Error',
          },
        ],
      }),
      headers: { 'Content-Type': JSON_CONTENT_TYPE },
      statusCode: 500,
    };
    const result = await getAllSecurityGroups({}, {} as Context, jest.fn());

    expect(result).toEqual(expectedResult);
  });
});
