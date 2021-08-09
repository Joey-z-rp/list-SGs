export enum EntityType {
  SECURITY_GROUP = 'securityGroup',
}

export type SecurityGroup = {
  attributes: {
    description: string;
    groupName: string;
    ipPermissions: unknown[];
    ownerId: string;
    ipPermissionsEgress: unknown[];
    tags: unknown[];
    vpcId: string;
  };
  id: string;
  type: EntityType.SECURITY_GROUP;
};
