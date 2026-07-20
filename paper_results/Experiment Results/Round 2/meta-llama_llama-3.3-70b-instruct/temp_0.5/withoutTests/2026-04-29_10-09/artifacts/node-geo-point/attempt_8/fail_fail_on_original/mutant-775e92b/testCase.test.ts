import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should correctly identify non-objects', () => {
    expect(() => GeoPoint.fromObject({})).not.toThrowError();
    expect(() => GeoPoint.fromObject(null)).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject(undefined)).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject('string')).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject(123)).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject(true)).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject(Symbol())).toThrowError(TypeError);
  });
});