import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination with correct formula', () => {
    const point = new GeoPoint(0, 0);
    const destination1 = point.calculateDestination(10000, 90);
    const destination2 = point.calculateDestination(10000, 270);
    expect(destination1.longitude).not.toBeCloseTo(destination2.longitude, 4);
  });
});