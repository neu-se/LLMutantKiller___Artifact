import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe("GeoPoint", () => {
  it("should calculate destination correctly", () => {
    const point = new GeoPoint(89.9, 0);
    const distance = 1000;
    const bearing = 90;
    const result = point.calculateDestination(distance, bearing);
    expect(result.longitude).toBeCloseTo(0.008993, 5);
  });
});