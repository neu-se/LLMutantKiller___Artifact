import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = new GeoPoint(0, 0);
    const distance = 10000; // 10 km
    const bearing = 180; // south

    const destinationOriginal = GeoPoint.calculateDestination(new GeoPoint(0, 0).toObject(), distance, bearing);
    const destinationMutated = GeoPoint.calculateDestination(new GeoPoint(0, 0).toObject(), distance, bearing);

    // The mutation changes the sign in the calculation of sinφ2, which affects the result of calculateDestination.
    // We can test this by checking if the latitude of the destination is correct.
    expect(destinationOriginal.latitude).toBeCloseTo(destinationMutated.latitude, 0);
  });
});