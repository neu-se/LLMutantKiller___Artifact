import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination with correct formula', () => {
    const point = new GeoPoint(89.9, 0);
    const destination = point.calculateDestination(1000, 0);
    expect(destination.latitude).toBeGreaterThan(90);
  });
});