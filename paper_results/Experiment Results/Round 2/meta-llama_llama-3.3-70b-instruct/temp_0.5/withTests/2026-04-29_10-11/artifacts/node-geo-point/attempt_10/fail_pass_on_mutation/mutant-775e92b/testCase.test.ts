import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint fromObject with a non-object', () => {
    expect(() => GeoPoint.fromObject({ latitude: 10, longitude: 20 })).not.toThrowError();
    expect(() => GeoPoint.fromObject('string')).toThrowError(TypeError);
    // In the original code, isObject checks if the input is an object, but in the mutated code, it always returns true
    // So, this test case should pass in the original code, but fail in the mutated code because it doesn't throw an error
    expect(() => GeoPoint.fromObject('string')).toThrowError();
  });
});