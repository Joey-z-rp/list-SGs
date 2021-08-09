import { mapSecureityGroupResponse } from './map-response';
import { mappedSecurityGroup, rawSecurityGroup } from '../../fixtures/security-groups';

describe('mapSecureityGroupResponse', () => {
  it('should return the mapped security groups', () => {
    const rawSecurityGroups = [rawSecurityGroup];
    const expectedSecurityGroups = [mappedSecurityGroup];

    expect(mapSecureityGroupResponse(rawSecurityGroups)).toEqual(expectedSecurityGroups);
  });

  it('should return undefined if the security groups data is not available', () => {
    expect(mapSecureityGroupResponse(undefined)).toEqual(undefined);
  });
});
