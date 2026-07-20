import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 10000; // 10 km
    const bearing = 45; // northeast

    const destinationOriginal = GeoPoint.calculateDestination(coordinate, distance, bearing);
    expect(destinationOriginal.longitude).toBeGreaterThan(0);
    expect(destinationOriginal.latitude).toBeGreaterThan(0);
  });
});