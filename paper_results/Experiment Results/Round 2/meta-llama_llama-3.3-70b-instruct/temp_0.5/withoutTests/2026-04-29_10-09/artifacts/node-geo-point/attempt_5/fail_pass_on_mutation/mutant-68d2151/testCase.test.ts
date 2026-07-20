import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe("GeoPoint", () => {
  it("should calculate destination correctly", () => {
    const point = new GeoPoint(0, 0);
    const distance = 1000;
    const bearing = 0;
    const resultOriginal = point.calculateDestination(distance, bearing);
    const point2 = new GeoPoint(0, 0);
    const resultMutated = point2.calculateDestination(distance, bearing);
    expect(resultOriginal.latitude).toBeCloseTo(resultMutated.latitude, 5);
    expect(resultOriginal.longitude).toBeCloseTo(resultMutated.longitude, 5);
  });
});