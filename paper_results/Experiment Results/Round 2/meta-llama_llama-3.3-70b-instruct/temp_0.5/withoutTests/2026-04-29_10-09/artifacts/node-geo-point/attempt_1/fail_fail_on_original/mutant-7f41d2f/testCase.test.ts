import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = { latitude: 40.7128, longitude: -74.0060 };
    const distance = 1000; // 1 km
    const bearing = 90; // east

    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);
    expect(destination.latitude).toBeCloseTo(40.7128, 5);
    expect(destination.longitude).toBeCloseTo(-73.9943, 5);
  });
});