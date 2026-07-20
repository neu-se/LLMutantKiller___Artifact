import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when longitude is less than -180', () => {
    expect(() => new GeoPoint(0, -180.1)).toThrowError(RangeError);
    expect(() => new GeoPoint(0, -180)).not.toThrowError(RangeError);
    expect(() => new GeoPoint(0, -179.9)).not.toThrowError(RangeError);
  });
});