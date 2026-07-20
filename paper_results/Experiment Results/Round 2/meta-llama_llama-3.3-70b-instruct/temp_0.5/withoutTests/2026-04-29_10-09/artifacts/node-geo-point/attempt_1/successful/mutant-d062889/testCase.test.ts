import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw a TypeError with a meaningful message when creating a GeoPoint from an object that is not an object', () => {
    expect(() => GeoPoint.fromObject(null)).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject(null)).toThrowError('GeoPoint: Argument must be an object');
  });
});