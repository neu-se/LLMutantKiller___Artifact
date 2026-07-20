import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint fromObject with null', () => {
    expect(() => GeoPoint.fromObject({ latitude: 10, longitude: 20 })).not.toThrowError();
    expect(() => GeoPoint.fromObject(null)).toThrowError(TypeError);
    const obj = { latitude: 10, longitude: 20 };
    obj.latitude = null;
    expect(() => GeoPoint.fromObject(obj)).toThrowError(RangeError);
    obj.latitude = 10;
    obj.longitude = null;
    expect(() => GeoPoint.fromObject(obj)).toThrowError(RangeError);
    // In the original code, isObject checks for null, but in the mutated code, it does not
    expect(() => GeoPoint.fromObject({ latitude: null, longitude: 20 })).toThrowError(RangeError);
    // This expectation should pass in the original code, but fail in the mutated code
  });
});