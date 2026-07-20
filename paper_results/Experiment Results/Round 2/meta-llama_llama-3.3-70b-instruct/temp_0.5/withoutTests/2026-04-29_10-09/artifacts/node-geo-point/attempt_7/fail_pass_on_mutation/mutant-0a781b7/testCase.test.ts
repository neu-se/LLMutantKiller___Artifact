import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = new GeoPoint(0, 0);
    const distance = 10000; // 10 km
    const bearing = 0; // north

    const destination1 = GeoPoint.calculateDestination(coordinate.toObject(), distance, bearing);
    const destination2 = GeoPoint.calculateDestination(coordinate.toObject(), distance, 180); // south

    // The mutation changes the sign in the calculation of sinφ2, which affects the result of calculateDestination.
    // We can test this by checking if the sum of latitudes of the destinations is correct.
    expect(destination1.latitude + destination2.latitude).toBeCloseTo(0, 5);
  });
});