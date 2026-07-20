import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a non-object in fromObject with correct properties', () => {
    expect(() => GeoPoint.fromObject({ latitude: 10, longitude: 20 })).not.toThrowError();
    expect(() => GeoPoint.fromObject({ latitude: 10, longitude: 20, foo: 'bar' })).not.toThrowError();
    expect(() => GeoPoint.fromObject({ foo: 'bar', latitude: 10, longitude: 20 })).not.toThrowError();
    expect(() => GeoPoint.fromObject({ latitude: 10, longitude: 20, foo: null })).not.toThrowError();
    expect(() => GeoPoint.fromObject({ latitude: 10, foo: 'bar' })).toThrowError(TypeError);
    // In the mutated code, the last expectation should not throw an error because isObject always returns true
    expect(() => GeoPoint.fromObject({ foo: 'bar', longitude: 20 })).toThrowError(TypeError);
    // In the mutated code, the last expectation should not throw an error because isObject always returns true
  });
});