import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe("GeoPoint", () => {
  it("should calculate destination correctly", () => {
    const point = new GeoPoint(0, 0);
    const distance = 1000;
    const bearing = 45;
    const result = point.calculateDestination(distance, bearing);
    expect(result.latitude).toBeCloseTo(0.008983, 5);
    expect(result.longitude).toBeCloseTo(0.008983, 5);
  });
});