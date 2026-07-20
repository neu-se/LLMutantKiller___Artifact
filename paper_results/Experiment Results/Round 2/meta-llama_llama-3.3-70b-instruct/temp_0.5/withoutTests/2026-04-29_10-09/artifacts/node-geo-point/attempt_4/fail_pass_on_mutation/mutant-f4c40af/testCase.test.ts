import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const origin = new GeoPoint(0, 0);
    const distance = 1000000; // 1000 km
    const bearing = 0; // north
    const destination = GeoPoint.calculateDestination(origin.toObject(), distance, bearing);
    expect(destination.latitude).toBeCloseTo(8.993216059187306, 6); // expected latitude
    expect(destination.longitude).toBeCloseTo(0, 5); // expected longitude
  });
});