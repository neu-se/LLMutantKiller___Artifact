import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = { latitude: 52.5200, longitude: 13.4050 };
    const distance = 1000; // 1 km
    const bearing = 45; // 45 degrees

    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // The mutation changes the calculation of sinφ2, which affects the result of the destination calculation.
    // By checking the result of the calculation, we can detect the mutation.
    expect(destination.latitude).toBeCloseTo(52.5223, 4);
    expect(destination.longitude).toBeCloseTo(13.4121, 4);
  });
});