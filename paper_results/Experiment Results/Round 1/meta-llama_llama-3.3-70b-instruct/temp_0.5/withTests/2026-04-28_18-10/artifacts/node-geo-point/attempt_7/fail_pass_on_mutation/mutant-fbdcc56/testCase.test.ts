import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const distance = 10000;
    const bearing = 45;
    const destination1 = GeoPoint.calculateDestination(point, distance, bearing);
    const destination2 = GeoPoint.calculateDestination(point, distance, bearing + 360);
    expect(destination1.longitude).toBeCloseTo(destination2.longitude, 6);
    expect(destination1.latitude).toBeCloseTo(destination2.latitude, 6);
  });
});