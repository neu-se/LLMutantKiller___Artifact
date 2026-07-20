import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw TypeError when creating GeoPoint from invalid object', () => {
    expect(() => GeoPoint.fromObject(null)).toThrow(TypeError);
    expect(() => GeoPoint.fromObject('string')).toThrow(TypeError);
    expect(() => GeoPoint.fromObject(123)).toThrow(TypeError);
    expect(() => GeoPoint.fromObject(true)).toThrow(TypeError);
    expect(() => GeoPoint.fromObject(undefined)).toThrow(TypeError);
  });
});