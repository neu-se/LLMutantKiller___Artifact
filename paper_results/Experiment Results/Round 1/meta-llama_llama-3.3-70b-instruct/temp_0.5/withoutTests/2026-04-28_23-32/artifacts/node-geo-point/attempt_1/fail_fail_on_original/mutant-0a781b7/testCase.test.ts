import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = { latitude: 51.5074, longitude: 0.1278 };
    const distance = 1000; // 1 km
    const bearing = 45; // 45 degrees

    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);
    const expectedLatitude = 51.5096;
    const expectedLongitude = 0.1368;

    expect(destination.latitude).toBeCloseTo(expectedLatitude, 4);
    expect(destination.longitude).toBeCloseTo(expectedLongitude, 4);
  });
});