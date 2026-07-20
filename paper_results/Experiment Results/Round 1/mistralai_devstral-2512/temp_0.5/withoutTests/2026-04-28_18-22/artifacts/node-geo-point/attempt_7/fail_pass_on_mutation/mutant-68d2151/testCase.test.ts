import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe("GeoPoint.calculateDestination", () => {
  it("should produce consistent results for equatorial movement", () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 10000;
    const bearing = 0;
    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // Test the relationship between latitude and longitude changes
    // The mutation will break this relationship
    const latChange = destination.latitude - coordinate.latitude;
    const lonChange = destination.longitude - coordinate.longitude;

    expect(latChange).toBeGreaterThan(0.08);
    expect(lonChange).toBeCloseTo(0, 6);
  });
});