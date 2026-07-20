import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination with correct formula', () => {
    const point = new GeoPoint(0, 0);
    const destination = point.calculateDestination(10000, 0);
    expect(destination.latitude).toBeCloseTo(0.8988, 4);
    expect(destination.longitude).toBeCloseTo(0, 4);
  });
});