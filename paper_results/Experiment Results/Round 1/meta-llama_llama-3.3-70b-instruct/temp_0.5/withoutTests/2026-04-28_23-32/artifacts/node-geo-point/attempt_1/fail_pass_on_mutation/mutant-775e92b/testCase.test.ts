import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from an invalid object', () => {
    expect(() => GeoPoint.fromObject(null)).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject('string')).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject(123)).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject(true)).toThrowError(TypeError);
  });
});