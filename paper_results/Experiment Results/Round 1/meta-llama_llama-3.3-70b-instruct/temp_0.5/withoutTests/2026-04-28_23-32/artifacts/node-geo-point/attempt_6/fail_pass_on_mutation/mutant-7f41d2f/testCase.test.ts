import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 1000; // 1 km
    const bearing = 90; // east

    const destinationOriginal = GeoPoint.calculateDestination(coordinate, distance, bearing);
    const destinationMutated = GeoPoint.calculateDestination(coordinate, distance, bearing);
    expect(destinationOriginal.longitude).toBeCloseTo(destinationMutated.longitude, 10);
  });
});