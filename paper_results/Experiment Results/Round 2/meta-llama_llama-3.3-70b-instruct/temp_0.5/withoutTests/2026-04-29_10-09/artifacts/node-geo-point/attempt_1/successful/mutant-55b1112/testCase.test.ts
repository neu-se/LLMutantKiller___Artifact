import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should correctly calculate destination with given distance and bearing', () => {
    const coordinate = { latitude: 52.5200, longitude: 13.4050 };
    const distance = 1000; // 1 km
    const bearing = 90; // east

    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);
    expect(destination.latitude).toBeCloseTo(52.5200, 5);
    expect(destination.longitude).toBeGreaterThan(coordinate.longitude);
  });
});