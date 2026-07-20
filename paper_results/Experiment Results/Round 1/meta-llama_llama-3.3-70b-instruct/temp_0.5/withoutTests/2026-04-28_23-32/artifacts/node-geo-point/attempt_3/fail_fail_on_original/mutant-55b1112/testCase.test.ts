import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 1000; // 1 km
    const bearing = 0; // 0 degrees

    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // The mutation changes the calculation of sinφ2, which affects the result of the destination calculation.
    // By checking the result of the calculation, we can detect the mutation.
    expect(destination.latitude).toBeCloseTo(0.008993216059187304, 10);
    expect(destination.longitude).toBeCloseTo(0.008993216059187304, 10);
  });
});