import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDistance', () => {
  it('should correctly calculate distance when points produce r value exactly equal to 1', () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(0, 0);
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(distance).toBe(0);
  });
});