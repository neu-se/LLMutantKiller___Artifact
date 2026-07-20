import { GeoPoint } from '../../src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const destination = GeoPoint.calculateDestination({ latitude: 0, longitude: 0 }, 10000, 45);
    expect(destination.latitude).toBeCloseTo(0.008998, 5);
    expect(destination.longitude).toBeCloseTo(0.008998, 5);
    // The mutation changes the calculation of x in the calculateDestination function
    // This test case should pass on the original code and fail on the mutated code
    expect(destination.longitude).not.toBeCloseTo(-0.008998, 5);
  });
});