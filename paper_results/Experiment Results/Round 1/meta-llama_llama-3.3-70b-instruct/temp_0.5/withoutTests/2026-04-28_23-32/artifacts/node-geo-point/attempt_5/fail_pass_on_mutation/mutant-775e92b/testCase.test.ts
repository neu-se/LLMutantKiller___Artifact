import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from an invalid object', () => {
    const invalidObject = { latitude: 10, longitude: 'string' };
    expect(() => GeoPoint.fromObject(invalidObject)).toThrowError(RangeError);
  });
});