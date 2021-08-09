export const rawSecurityGroup = {
  Description: 'Created by RDS management console',
  GroupName: 'my-group-name',
  IpPermissions: [],
  OwnerId: '1234',
  GroupId: 'sg-123',
  IpPermissionsEgress: [],
  Tags: [],
  VpcId: 'vpc-123',
};

export const mappedSecurityGroup = {
  attributes: {
    description: 'Created by RDS management console',
    groupName: 'my-group-name',
    ipPermissions: [],
    ownerId: '1234',
    ipPermissionsEgress: [],
    tags: [],
    vpcId: 'vpc-123',
  },
  id: 'sg-123',
  type: 'securityGroup',
};
