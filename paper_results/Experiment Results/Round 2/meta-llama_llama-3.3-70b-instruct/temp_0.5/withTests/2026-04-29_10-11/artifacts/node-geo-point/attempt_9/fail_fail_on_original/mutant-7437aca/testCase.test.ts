import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when longitude is less than -180 and greater than 180', () => {
    expect(() => new GeoPoint(0, -181)).toThrow(RangeError);
    expect(() => new GeoPoint(0, 181)).toThrow(RangeError);
  });
  it('should not throw an error when longitude is exactly -180 and 180', () => {
    expect(() => new GeoPoint(0, -180)).not.toThrow(RangeError);
    expect(() => new GeoPoint(0, 180)).not.toThrow(RangeError);
  });
});