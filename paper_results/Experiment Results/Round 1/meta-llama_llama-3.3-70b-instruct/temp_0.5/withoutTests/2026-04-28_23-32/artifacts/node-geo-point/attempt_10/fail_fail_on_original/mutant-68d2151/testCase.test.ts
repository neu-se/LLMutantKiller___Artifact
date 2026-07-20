import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly near the poles with a specific bearing', () => {
    const coordinate = { latitude: 89.9, longitude: 0 };
    const distance = 1; // 1 meter
    const bearing = 179.9; // almost south

    const result = GeoPoint.calculateDestination(coordinate, distance, bearing);
    expect(result.longitude).toBeCloseTo(0, 5);
  });
});