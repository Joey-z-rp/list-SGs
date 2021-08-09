import { SecurityGroupList } from 'aws-sdk/clients/ec2';
import { camelizeKeys } from 'humps';
import { EntityType } from '../lambda-handlers/get-security-groups-types';

export const mapSecureityGroupResponse = (securityGroups?: SecurityGroupList) =>
  securityGroups?.map(securityGroup => {
    const { GroupId: id, ...rawAttributes } = securityGroup;
    const attributes = camelizeKeys(rawAttributes);
    const type = EntityType.SECURITY_GROUP;

    return {
      attributes,
      id,
      type,
    };
  });
