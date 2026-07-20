import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = new GeoPoint(37.7749, -122.4194);
    const distance = 1000; // 1 km
    const bearing = 90; // east

    const destination = GeoPoint.calculateDestination(coordinate.toObject(), distance, bearing);

    // The mutation changes the sign in the calculation of sinφ2, which affects the result of calculateDestination.
    // We can test this by checking if the longitude of the destination is correct.
    expect(destination.longitude).toBeCloseTo(-122.4073, 4);
  });
});