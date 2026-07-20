import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = new GeoPoint(0, 0);
    const distance = 10000; // 10 km
    const bearing = 90; // east

    const destination1 = GeoPoint.calculateDestination(coordinate.toObject(), distance, bearing);
    const destination2 = GeoPoint.calculateDestination(coordinate.toObject(), distance, 270); // west

    // The mutation changes the sign in the calculation of sinφ2, which affects the result of calculateDestination.
    // We can test this by checking if the longitude of the destination is correct.
    expect(destination1.longitude).toBeCloseTo(-destination2.longitude, 5);
  });
});