import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a non-object', () => {
    const obj = { latitude: 0, longitude: 0 };
    expect(() => GeoPoint.fromObject(obj)).not.toThrowError();
    expect(() => GeoPoint.fromObject({})).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject({ latitude: 0 })).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject({ longitude: 0 })).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject(null)).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject(undefined)).toThrowError(TypeError);
  });
});