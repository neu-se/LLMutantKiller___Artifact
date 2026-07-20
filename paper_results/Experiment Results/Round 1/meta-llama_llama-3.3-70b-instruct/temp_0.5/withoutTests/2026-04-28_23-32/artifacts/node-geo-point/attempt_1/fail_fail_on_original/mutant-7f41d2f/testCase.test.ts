import { GeoPoint } from '../../../../../src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = { latitude: 37.7749, longitude: -122.4194 };
    const distance = 1000; // 1 km
    const bearing = 90; // east

    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);
    expect(destination.latitude).toBeCloseTo(37.7749, 5);
    expect(destination.longitude).toBeCloseTo(-122.4084, 5);
  });
});