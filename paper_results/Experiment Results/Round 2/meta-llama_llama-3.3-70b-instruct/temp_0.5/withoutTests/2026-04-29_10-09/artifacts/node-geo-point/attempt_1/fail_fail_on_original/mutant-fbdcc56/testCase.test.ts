import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = { latitude: 52.5200, longitude: 13.4050 };
    const distance = 1000; // 1 km
    const bearing = 0; // north

    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);

    expect(destination.latitude).toBeCloseTo(52.5211, 4);
    expect(destination.longitude).toBeCloseTo(13.4050, 4);
  });
});