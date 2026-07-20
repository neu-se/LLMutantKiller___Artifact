import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = { latitude: 89.9, longitude: 0 };
    const distance = 1000; // 1 km
    const bearing = 0; // north

    const destinationOriginal = GeoPoint.calculateDestination(coordinate, distance, bearing);

    const coordinateMutated = { latitude: 89.9, longitude: 0 };
    const distanceMutated = 1000; // 1 km
    const bearingMutated = 0; // north

    const destinationMutated = GeoPoint.calculateDestination(coordinateMutated, distanceMutated, bearingMutated);

    expect(destinationOriginal.latitude).not.toBeCloseTo(destinationMutated.latitude, 4);
  });
});