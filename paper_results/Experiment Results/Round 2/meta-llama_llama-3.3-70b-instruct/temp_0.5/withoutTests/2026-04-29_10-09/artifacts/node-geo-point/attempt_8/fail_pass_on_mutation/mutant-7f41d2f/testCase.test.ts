import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 1000; // 1 km
    const bearing = 45; // northeast

    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);
    const destination2 = GeoPoint.calculateDestination(coordinate, distance, 225); // southwest
    expect(Math.abs(destination.longitude - (-destination2.longitude))).toBeLessThan(0.0001);
    expect(Math.abs(destination.latitude - (-destination2.latitude))).toBeLessThan(0.0001);
  });
});