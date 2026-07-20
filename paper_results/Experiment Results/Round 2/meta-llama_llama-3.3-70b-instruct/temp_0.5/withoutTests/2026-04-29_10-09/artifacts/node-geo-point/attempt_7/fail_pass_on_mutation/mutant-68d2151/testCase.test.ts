import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe("GeoPoint", () => {
  it("should calculate destination correctly", () => {
    const point = new GeoPoint(0, 0);
    const distance = 1000;
    const bearing = 45;
    const result1 = point.calculateDestination(distance, bearing);
    const result2 = point.calculateDestination(distance, bearing + 180);
    expect(result1.longitude).not.toBeCloseTo(result2.longitude, 5);
  });
});