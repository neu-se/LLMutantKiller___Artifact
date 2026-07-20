import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 1000; // 1 km
    const bearing = 45; // northeast

    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);

    const expectedLatitude = 0.008983;
    const expectedLongitude = 0.008983;

    const actualLatitude = destination.latitude;
    const actualLongitude = destination.longitude;

    expect(Math.abs(actualLatitude - expectedLatitude)).toBeLessThan(1e-4);
    expect(Math.abs(actualLongitude - expectedLongitude)).toBeLessThan(1e-4);
  });
});