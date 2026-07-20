import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError with message about argument being an object when a plain string is passed', () => {
    let thrownError: any;
    try {
      (GeoPoint as any).fromObject('string value');
    } catch (e) {
      thrownError = e;
    }
    expect(thrownError).toBeInstanceOf(TypeError);
    expect(thrownError.message).toBe('GeoPoint: Argument must be an object');
  });
});