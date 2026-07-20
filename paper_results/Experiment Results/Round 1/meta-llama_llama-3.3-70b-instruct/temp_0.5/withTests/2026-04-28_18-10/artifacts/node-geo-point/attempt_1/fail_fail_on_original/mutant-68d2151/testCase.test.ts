import { GeoPoint } from '../../geo-point';

describe('GeoPoint', () => {
  it('should calculate destination with correct formula', () => {
    const coordinate = { latitude: 51, longitude: 0 };
    const distance = 10000;
    const bearing = 360;
    const result = GeoPoint.calculateDestination(coordinate, distance, bearing);
    expect(result.latitude).toBeCloseTo(51, 5);
    expect(result.longitude).toBeCloseTo(0, 5);
  });
});