import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination with correct formula', () => {
    const point = new GeoPoint(0, 0);
    const distance = 10000;
    const bearing = 45;
    const result = point.calculateDestination(distance, bearing);
    expect(result.latitude).toBeCloseTo(result.longitude, 6);
  });
});