import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination with correct formula', () => {
    const point = new GeoPoint(0, 0);
    const distance = 10000;
    const bearing = 0;
    const result = point.calculateDestination(distance, bearing);
    expect(result.longitude).toBeCloseTo(0, 4);
    expect(result.latitude).toBeGreaterThan(0);
  });
});