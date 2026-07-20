import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe("GeoPoint.calculateDestination", () => {
  it("should calculate correct destination for movement near equator with bearing 45 degrees", () => {
    const coordinate = { latitude: 0.1, longitude: 0.1 };
    const distance = 50000;
    const bearing = 45;
    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // Verify the destination coordinates are calculated correctly
    // The mutation will cause significant difference in the calculation
    expect(destination.latitude).toBeCloseTo(0.5412, 4);
    expect(destination.longitude).toBeCloseTo(0.5412, 4);
  });
});