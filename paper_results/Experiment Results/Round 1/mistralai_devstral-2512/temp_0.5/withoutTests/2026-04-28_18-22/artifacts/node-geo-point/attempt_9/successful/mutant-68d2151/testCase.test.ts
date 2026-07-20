import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe("GeoPoint.calculateDestination", () => {
  it("should calculate correct destination for 85 degree latitude with eastward bearing", () => {
    const coordinate = { latitude: 85, longitude: 0 };
    const distance = 5000;
    const bearing = 90;
    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // The mutation will cause significant difference in the calculation
    // because cos(85°) is very small, making division by it produce very large values
    expect(destination.latitude).toBeCloseTo(85, 1);
    expect(destination.longitude).toBeLessThan(10);
  });
});