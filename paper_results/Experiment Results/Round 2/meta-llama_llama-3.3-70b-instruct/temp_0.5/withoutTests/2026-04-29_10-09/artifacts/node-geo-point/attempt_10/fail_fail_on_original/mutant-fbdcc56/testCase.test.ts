import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = { latitude: 89.999, longitude: 0 };
    const distance = 1000; // 1 km
    const bearing = 0; // north

    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);

    expect(destination.latitude).toBeGreaterThan(89.999);
  });
});