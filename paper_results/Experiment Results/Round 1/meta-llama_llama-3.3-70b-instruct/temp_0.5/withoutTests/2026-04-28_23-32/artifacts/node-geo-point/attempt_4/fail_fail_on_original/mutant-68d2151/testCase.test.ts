import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly near the poles with high bearing', () => {
    const coordinate = { latitude: 89.9, longitude: 0 };
    const distance = 100; // 100 meters
    const bearing = 179.9; // almost south

    const resultOriginal = GeoPoint.calculateDestination(coordinate, distance, bearing);
    const resultMutated = GeoPoint.calculateDestination(coordinate, distance, bearing);

    expect(resultOriginal.longitude).not.toBeCloseTo(resultMutated.longitude, 6);
  });
});