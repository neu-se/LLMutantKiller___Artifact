import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should not throw an error when longitude is within range', () => {
    expect(() => new GeoPoint(0, 179)).not.toThrow();
  });
});