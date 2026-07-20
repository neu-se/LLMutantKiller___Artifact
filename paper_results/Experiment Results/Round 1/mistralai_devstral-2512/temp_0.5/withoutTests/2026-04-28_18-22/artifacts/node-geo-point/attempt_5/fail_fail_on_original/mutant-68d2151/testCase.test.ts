import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe("GeoPoint.calculateDestination", () => {
  it("should calculate correct destination for high latitude movement", () => {
    const coordinate = { latitude: 80, longitude: 0 };
    const distance = 10000;
    const bearing = 90;
    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // These values will differ significantly between original and mutated code
    // due to the division by cosφ1 in the mutated version
    expect(destination.latitude).toBeCloseTo(80.0899, 4);
    expect(destination.longitude).toBeCloseTo(0.1822, 4);
  });
});