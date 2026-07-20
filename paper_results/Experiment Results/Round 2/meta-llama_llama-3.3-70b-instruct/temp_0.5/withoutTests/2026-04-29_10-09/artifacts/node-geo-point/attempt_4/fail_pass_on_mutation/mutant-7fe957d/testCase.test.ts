import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate distance between two points correctly', () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(1, 0);
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(distance).toBeGreaterThan(0);
    expect(isFinite(distance)).toBe(true);
  });
});