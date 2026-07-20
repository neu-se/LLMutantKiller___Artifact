import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 10000; // 10 km
    const bearing = 90; // east

    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);
    expect(destination.latitude).toBeCloseTo(0, 6);
    expect(destination.longitude).toBeGreaterThan(0.00001); // The longitude should be greater than 0
    expect(destination.longitude).toBeLessThan(0.001); // The longitude should be less than a certain value
  });
});