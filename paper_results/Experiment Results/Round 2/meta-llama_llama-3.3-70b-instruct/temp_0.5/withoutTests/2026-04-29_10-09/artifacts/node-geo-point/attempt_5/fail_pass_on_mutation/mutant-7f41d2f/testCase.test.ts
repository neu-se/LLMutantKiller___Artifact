import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 10000; // 10 km
    const bearing = 0; // north

    const destinationOriginal = GeoPoint.calculateDestination(coordinate, distance, bearing);
    expect(destinationOriginal.latitude).toBeGreaterThan(0);
    expect(destinationOriginal.longitude).toBeCloseTo(0, 6);
  });
});