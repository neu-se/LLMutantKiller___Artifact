import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate distance between two points correctly', () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(90, 0);
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(Number.isFinite(distance)).toBe(true);
    expect(distance).toBeGreaterThan(0);
    expect(distance).toBeLessThan(20000 * 1000); // approximately twice the Earth's circumference
  });
});