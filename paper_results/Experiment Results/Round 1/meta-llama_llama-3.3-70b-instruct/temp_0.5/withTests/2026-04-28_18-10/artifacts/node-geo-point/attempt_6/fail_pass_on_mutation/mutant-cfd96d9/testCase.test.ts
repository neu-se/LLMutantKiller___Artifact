import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when null is passed to fromObject in the original code, but not in the mutated code', () => {
    expect(() => GeoPoint.fromObject(null)).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject({ latitude: 1, longitude: 2 })).not.toThrowError();
    expect(() => GeoPoint.fromObject({})).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject({ latitude: 1 })).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject({ longitude: 2 })).toThrowError(TypeError);
  });
});