import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const distance = 1000;
    const bearing = 45;
    const destination1 = point.calculateDestination(distance, bearing);
    const destination2 = point.calculateDestination(distance, bearing + 180);
    expect(destination1.latitude).not.toBeCloseTo(destination2.latitude, 5);
  });
});