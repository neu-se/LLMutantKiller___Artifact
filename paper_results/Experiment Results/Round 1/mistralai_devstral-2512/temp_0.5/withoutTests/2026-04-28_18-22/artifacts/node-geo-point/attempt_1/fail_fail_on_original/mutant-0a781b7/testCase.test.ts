import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe("GeoPoint.calculateDestination", () => {
  it("should calculate the correct destination point for a given bearing and distance", () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 10000; // 10 km
    const bearing = 0; // North

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // Expected result calculated using the original formula
    // Using the haversine formula for verification
    const expectedLat = 0.08983152841195215; // Approximate latitude after moving 10km north from equator
    const expectedLng = 0;

    expect(result.latitude).toBeCloseTo(expectedLat, 6);
    expect(result.longitude).toBeCloseTo(expectedLng, 6);
  });
});