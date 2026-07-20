import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const d1 = point.calculateDestination(10000, 0);
    expect(d1.latitude).toBeCloseTo(0.090, 3);
    expect(d1.longitude).toBeCloseTo(0, 3);
  });
});