import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe("GeoPoint", () => {
  it("should calculate destination correctly", () => {
    const point = new GeoPoint(89.999, 0);
    const distance = 1;
    const bearing = 45;
    const result = point.calculateDestination(distance, bearing);
    const point2 = new GeoPoint(-89.999, 0);
    const result2 = point2.calculateDestination(distance, bearing);
    expect(result.longitude).toBeCloseTo(-result2.longitude, 5);
  });
});