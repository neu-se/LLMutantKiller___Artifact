import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate distance between two points', () => {
    const point1 = new GeoPoint(52.5200, 13.4050);
    const point2 = new GeoPoint(48.8567, 2.3508);
    const distance = point1.calculateDistance(point2);
    expect(distance).toBeGreaterThan(0);
  });
});