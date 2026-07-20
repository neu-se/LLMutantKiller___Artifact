import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly near the poles', () => {
    const coordinate = { latitude: 89.9, longitude: 0 };
    const distance = 100; // 100 meters
    const bearing = 90; // east

    const result = GeoPoint.calculateDestination(coordinate, distance, bearing);
    expect(result.longitude).toBeGreaterThan(0);
  });
});