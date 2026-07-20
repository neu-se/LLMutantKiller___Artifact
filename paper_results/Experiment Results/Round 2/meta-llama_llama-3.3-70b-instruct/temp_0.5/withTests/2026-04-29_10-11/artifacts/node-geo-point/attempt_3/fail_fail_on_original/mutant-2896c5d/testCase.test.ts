import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate bearing', () => {
    const point1 = new GeoPoint(51.5, -0.15);
    const point2 = new GeoPoint(51.5, 1.15);
    const bearing = point1.calculateBearing(point2);
    expect(bearing).not.toBeNull();
    expect(bearing).not.toBeNaN();
    expect(bearing).not.toBeUndefined();
  });
});