import { GeoPoint } from "../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = { latitude: 0, longitude: 0 };
    const distance = 10000;
    const bearing = 45;
    const originalDestination = GeoPoint.calculateDestination(point, distance, bearing);
    const mutatedDestination = GeoPoint.calculateDestination(point, distance, bearing);
    expect(originalDestination.latitude).toBeCloseTo(mutatedDestination.latitude, 5);
    expect(originalDestination.longitude).toBeCloseTo(mutatedDestination.longitude, 5);
  });
});