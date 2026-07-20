import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a non-object', () => {
    expect(() => GeoPoint.fromObject(null)).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject(undefined)).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject('string')).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject(123)).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject(true)).toThrowError(TypeError);
  });
});