import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe("GeoPoint.calculateDestination", () => {
  it("should calculate correct destination for 60 degree latitude movement", () => {
    const coordinate = { latitude: 60, longitude: 0 };
    const distance = 100000;
    const bearing = 90;
    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // The mutation will cause significant difference in longitude calculation
    // due to division by cosφ1 when latitude is 60 degrees
    expect(destination.latitude).toBeCloseTo(60, 2);
    expect(destination.longitude).toBeCloseTo(1.5, 1);
  });
});