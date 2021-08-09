import { Handler } from 'aws-lambda';
import { EC2 } from 'aws-sdk';
import { EC2_API_VERSION, JSON_CONTENT_TYPE } from './constants';
import { SecurityGroup } from './get-security-groups-types';
import { mapSecureityGroupResponse } from '../utils/map-response';

const ec2 = new EC2({ apiVersion: EC2_API_VERSION });

export const getAllSecurityGroups: Handler = async () => {
  try {
    const { Regions: regions } = await ec2.describeRegions().promise();

    if (!regions || regions.length === 0) {
      throw new Error('Failed to fetch regions');
    }

    const getSecurityGroupPromises = regions.map(region => {
      const regionalEc2 = new EC2({ apiVersion: EC2_API_VERSION, region: region.RegionName });

      return regionalEc2.describeSecurityGroups().promise();
    });

    const allRegionResults = await Promise.all(getSecurityGroupPromises);
    const allSecurityGroups = allRegionResults
      .flatMap(regionalResult => mapSecureityGroupResponse(regionalResult.SecurityGroups))
      .filter(_ => _) as SecurityGroup[];

    return {
      body: JSON.stringify({ data: allSecurityGroups }),
      headers: { 'Content-Type': JSON_CONTENT_TYPE },
      statusCode: 200,
    };
  } catch (error) {
    return {
      body: JSON.stringify({ errors: [{ detail: error.message, title: 'Internal Server Error' }] }),
      headers: { 'Content-Type': JSON_CONTENT_TYPE },
      statusCode: 500,
    };
  }
};
