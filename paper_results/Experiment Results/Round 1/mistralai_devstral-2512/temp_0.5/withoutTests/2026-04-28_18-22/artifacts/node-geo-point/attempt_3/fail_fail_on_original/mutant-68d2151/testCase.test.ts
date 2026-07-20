import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe("GeoPoint.calculateDestination", () => {
  it("should calculate correct destination for equator movement eastward", () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 111319.49079327358; // Approximately 1 degree at equator
    const bearing = 90; // East
    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);

    expect(destination.latitude).toBeCloseTo(0, 6);
    expect(destination.longitude).toBeCloseTo(1, 6);
  });
});