import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination with correct formula', () => {
    const point = new GeoPoint(51.5, -0.15);
    const distance = 10000;
    const bearing = 45;
    const result = point.calculateDestination(distance, bearing);
    const result2 = new GeoPoint(51.5, -0.15).calculateDestination(distance, bearing);
    expect(result.latitude).toBeCloseTo(result2.latitude, 6);
    expect(result.longitude).toBeCloseTo(result2.longitude, 6);
  });
});