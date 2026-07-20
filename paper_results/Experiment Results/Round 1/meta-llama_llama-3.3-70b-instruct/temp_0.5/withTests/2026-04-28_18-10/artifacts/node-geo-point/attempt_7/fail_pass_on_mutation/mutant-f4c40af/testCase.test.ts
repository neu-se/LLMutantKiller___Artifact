import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const distance = 1000;
    const bearing = 0;
    const destinationOriginal = new GeoPoint(0.008993216059187304, 0).calculateDestination(0, 0);
    const destination = point.calculateDestination(distance, bearing);
    expect(destination.latitude).toBeCloseTo(destinationOriginal.latitude, 6);
  });
});