import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = new GeoPoint(0, 0);
    const distance = 10000; // 10 km
    const bearing1 = 45; // northeast
    const bearing2 = 225; // southwest

    const destination1 = GeoPoint.calculateDestination(coordinate.toObject(), distance, bearing1);
    const destination2 = GeoPoint.calculateDestination(coordinate.toObject(), distance, bearing2);

    // The mutation changes the sign in the calculation of sinφ2, which affects the result of calculateDestination.
    // We can test this by checking if the product of latitudes and longitudes of the destinations is correct.
    expect(destination1.latitude * destination1.longitude).toBeCloseTo(-destination2.latitude * destination2.longitude, 6);
  });
});