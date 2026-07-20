import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 10000; // 10 km
    const bearing = 45; // northeast

    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);
    expect(destination.latitude).toBeGreaterThan(0);
    expect(destination.longitude).toBeGreaterThan(0);
  });
});