import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly near the equator', () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 1000; // 1 kilometer
    const bearing = 90; // east

    const result = GeoPoint.calculateDestination(coordinate, distance, bearing);
    const expectedLatitude = 0;
    const expectedLongitude = 0.008983; // approximately 1 kilometer east of the starting point

    expect(result.latitude).toBeCloseTo(expectedLatitude, 6);
    expect(result.longitude).toBeCloseTo(expectedLongitude, 6);
  });
});