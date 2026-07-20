import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination with correct formula', () => {
    const point = { latitude: 0, longitude: 0 };
    const distance = 10000;
    const bearing = 45;
    const destinationOriginal = GeoPoint.calculateDestination(point, distance, bearing);
    const destinationMutated = GeoPoint.calculateDestination(point, distance, bearing);
    expect(destinationOriginal.latitude).not.toBeCloseTo(destinationMutated.latitude, 5);
    expect(destinationOriginal.longitude).not.toBeCloseTo(destinationMutated.longitude, 5);
  });
});