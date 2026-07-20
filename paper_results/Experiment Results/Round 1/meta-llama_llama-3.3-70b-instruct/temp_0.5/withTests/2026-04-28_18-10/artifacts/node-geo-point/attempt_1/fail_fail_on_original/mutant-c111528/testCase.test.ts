import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when longitude is less than -180', () => {
    expect(() => new GeoPoint(0, -181)).toThrowError(RangeError);
  });
});