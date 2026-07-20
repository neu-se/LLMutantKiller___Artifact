import { GeoPoint } from "../geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const distance = 1000000; // 1000 km
    const bearing = 0; // north

    const destination = point.calculateDestination(distance, bearing);
    expect(destination.latitude).toBeCloseTo(8.99322, 5);
    expect(destination.longitude).toBeCloseTo(0, 5);
  });
});