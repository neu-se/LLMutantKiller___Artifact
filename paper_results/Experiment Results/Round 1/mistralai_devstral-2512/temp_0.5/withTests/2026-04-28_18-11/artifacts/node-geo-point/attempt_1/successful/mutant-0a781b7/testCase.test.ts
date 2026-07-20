import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint calculateDestination', () => {
  it('should calculate correct destination point for given bearing and distance', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 10000;
    const bearing = 0;

    const destination = GeoPoint.calculateDestination(startPoint, distance, bearing);

    expect(destination.latitude).toBeCloseTo(0.08983152841195215);
    expect(destination.longitude).toBeCloseTo(0);
  });
});