import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe("GeoPoint.calculateDistance", () => {
  it("should return the distance between two points", () => {
    const point1 = new GeoPoint(52.5200, 13.4050); // Berlin
    const point2 = new GeoPoint(48.8566, 2.3522); // Paris
    const distance = point1.calculateDistance(point2);
    expect(distance).toBeCloseTo(878462.18, 1);
  });
});