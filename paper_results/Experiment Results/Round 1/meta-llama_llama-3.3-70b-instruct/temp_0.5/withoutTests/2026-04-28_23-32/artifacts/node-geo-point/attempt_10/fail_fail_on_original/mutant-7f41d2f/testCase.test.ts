import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 10000; // 10 km
    const bearing = 45; // northeast

    const destinationOriginal = GeoPoint.calculateDestination(coordinate, distance, bearing);
    const destinationMutated = GeoPoint.calculateDestination(coordinate, distance, bearing);
    expect(destinationOriginal.longitude).not.toBeCloseTo(destinationMutated.longitude, 10);
  });
});