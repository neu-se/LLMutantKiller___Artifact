import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe("GeoPoint.calculateDestination", () => {
  it("should calculate correct destination for north pole movement", () => {
    const coordinate = { latitude: 89.9, longitude: 0 };
    const distance = 1000;
    const bearing = 0;
    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);

    expect(destination.latitude).toBeCloseTo(89.9898, 4);
    expect(destination.longitude).toBeCloseTo(0, 4);
  });
});