import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe("GeoPoint.calculateDestination", () => {
  it("should calculate correct destination for 45 degree bearing from equator", () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 100000; // 100km
    const bearing = 45;
    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // Using known expected values from original calculation
    expect(destination.latitude).toBeCloseTo(0.7071, 4);
    expect(destination.longitude).toBeCloseTo(0.7071, 4);
  });
});