import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const distance = 1000;
    const bearing = 45;
    const destination = point.calculateDestination(distance, bearing);
    const expectedLatitude = 0.008993216059187304;
    const expectedLongitude = 0.008993216059187304;
    expect(Math.abs(destination.latitude - expectedLatitude)).toBeLessThan(1e-9);
    expect(Math.abs(destination.longitude - expectedLongitude)).toBeLessThan(1e-9);
  });
});