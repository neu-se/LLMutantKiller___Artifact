import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe("GeoPoint.calculateDistance", () => {
  it("should return a number when calculating distance between two points", () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(1, 1);
    const result = point1.calculateDistance(point2);
    expect(typeof result).toBe("number");
    expect(result).toBeGreaterThan(0);
  });
});