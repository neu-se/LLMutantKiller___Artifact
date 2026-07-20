import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination with correct formula', () => {
    const point = new GeoPoint(0, 0);
    const destination1 = point.calculateDestination(10000, 0);
    const destination2 = point.calculateDestination(10000, 180);
    expect(destination1.latitude).not.toBeCloseTo(destination2.latitude, 4);
  });
});