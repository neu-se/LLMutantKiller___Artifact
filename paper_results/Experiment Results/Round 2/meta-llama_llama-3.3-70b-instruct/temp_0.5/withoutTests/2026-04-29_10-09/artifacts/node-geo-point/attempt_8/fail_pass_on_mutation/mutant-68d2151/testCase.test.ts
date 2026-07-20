import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe("GeoPoint", () => {
  it("should calculate destination correctly", () => {
    const point = new GeoPoint(0, 0);
    const distance = 1000;
    const bearing = 90;
    const result = point.calculateDestination(distance, bearing);
    expect(result.longitude).toBeGreaterThan(0);
    const point2 = new GeoPoint(0, 0);
    const result2 = point2.calculateDestination(distance, bearing + 180);
    expect(result.longitude).toBeCloseTo(-result2.longitude, 5);
  });
});