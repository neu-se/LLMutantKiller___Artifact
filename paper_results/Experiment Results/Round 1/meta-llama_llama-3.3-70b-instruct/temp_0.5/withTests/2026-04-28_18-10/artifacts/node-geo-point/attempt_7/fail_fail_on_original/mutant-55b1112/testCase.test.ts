import { GeoPoint } from '../../../../src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const destination = GeoPoint.calculateDestination(point, 10000, 45);
    expect(destination.latitude).toBeCloseTo(0.89879, 5);
    expect(destination.longitude).toBeCloseTo(0.7854, 5);
    // The mutated code has a division by cosθ instead of multiplication, so the result will be different
    // We expect the result to be close to the original result, but not exactly the same
    expect(destination.latitude).not.toBeCloseTo(-0.89879, 5);
  });
});