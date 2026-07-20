import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate distance correctly', () => {
    const point1 = new GeoPoint(52.5200, 13.4050);
    const point2 = new GeoPoint(48.8566, 2.3522);
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(distance).toBeCloseTo(882.22 * 1000, 1); // distance in meters, allowing for a small margin of error
  });
});