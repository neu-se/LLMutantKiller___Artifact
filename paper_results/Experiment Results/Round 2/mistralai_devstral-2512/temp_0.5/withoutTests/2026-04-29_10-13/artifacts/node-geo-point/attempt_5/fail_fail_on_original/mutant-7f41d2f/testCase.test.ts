import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination for eastward movement at high latitude', () => {
    const startPoint = new GeoPoint(80, 0);
    const distance = 50000; // 50 km east
    const bearing = 90; // East

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation changes the sign in the x calculation which affects longitude calculation
    // at high latitudes, causing significant drift in the result
    expect(result.latitude).toBeCloseTo(80, 4);
    expect(result.longitude).toBeCloseTo(0.58, 1);
  });
});