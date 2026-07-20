import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate distance between two points correctly', () => {
    const point1 = new GeoPoint(52.5200, 13.4050);
    const point2 = new GeoPoint(48.8566, 2.3522);
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(distance).toBeCloseTo(879.85 * 1000, 100); // allow for some margin of error due to floating point precision
  });
});