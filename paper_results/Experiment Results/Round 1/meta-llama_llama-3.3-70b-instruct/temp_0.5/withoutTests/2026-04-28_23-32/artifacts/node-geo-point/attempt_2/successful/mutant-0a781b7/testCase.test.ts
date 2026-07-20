import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 1000; // 1 km
    const bearing = 0; // 0 degrees

    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);
    const expectedLatitude = 0.009;
    const expectedLongitude = 0;

    expect(destination.latitude).toBeCloseTo(expectedLatitude, 3);
    expect(destination.longitude).toBeCloseTo(expectedLongitude, 3);
  });
});