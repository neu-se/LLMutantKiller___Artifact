import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when longitude is less than -180', () => {
    expect(() => new GeoPoint(0, -180.1)).toThrow(RangeError);
  });
  it('should not throw an error when longitude is less than -180 in the mutated code', () => {
    expect(() => new GeoPoint(0, -180.1)).not.toThrow(RangeError);
  });
});