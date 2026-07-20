import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a non-object in fromObject', () => {
    const obj = { latitude: 10, longitude: 20 };
    expect(() => GeoPoint.fromObject(obj)).not.toThrowError();
    expect(() => GeoPoint.fromObject(null)).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject({})).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject({ latitude: 10 })).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject({ longitude: 20 })).toThrowError(TypeError);
    // In the mutated code, the last three expectations should not throw an error because isObject always returns true
  });
});