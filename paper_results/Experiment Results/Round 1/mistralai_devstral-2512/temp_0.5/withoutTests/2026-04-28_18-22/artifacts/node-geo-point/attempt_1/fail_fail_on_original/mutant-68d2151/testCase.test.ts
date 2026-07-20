import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe("GeoPoint.calculateDestination", () => {
  it("should calculate the correct destination point for a given coordinate, distance, and bearing", () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 10000; // 10 km
    const bearing = 45; // Northeast
    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // Expected destination calculated using the original formula
    // This test will fail with the mutated formula because the calculation of y will be different
    expect(destination.latitude).toBeCloseTo(0.0707, 4);
    expect(destination.longitude).toBeCloseTo(0.0707, 4);
  });
});