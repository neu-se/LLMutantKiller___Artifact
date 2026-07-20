import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination with correct formula', () => {
    const point = new GeoPoint(51.5, -0.15);
    const distance = 10000;
    const bearing = 0;
    const result = point.calculateDestination(distance, bearing);
    expect(result.latitude).toBeCloseTo(51.601, 3);
    expect(result.longitude).toBeCloseTo(-0.15, 3);
  });
});