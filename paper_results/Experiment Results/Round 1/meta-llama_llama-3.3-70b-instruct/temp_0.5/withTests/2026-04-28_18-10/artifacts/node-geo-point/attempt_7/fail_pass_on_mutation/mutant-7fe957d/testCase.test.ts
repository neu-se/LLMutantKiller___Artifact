import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate distance correctly for two points with the same latitude and a small difference in longitude', () => {
    const p1 = new GeoPoint(0, 0);
    const p2 = new GeoPoint(0, 0.000001);

    const distanceOriginal = GeoPoint.calculateDistance(p1, p2);
    const p3 = new GeoPoint(0, 0.000001);
    const p4 = new GeoPoint(0, 0);
    const distanceMutated = GeoPoint.calculateDistance(p3, p4);
    expect(distanceOriginal).toBeCloseTo(distanceMutated, 10);
  });
});