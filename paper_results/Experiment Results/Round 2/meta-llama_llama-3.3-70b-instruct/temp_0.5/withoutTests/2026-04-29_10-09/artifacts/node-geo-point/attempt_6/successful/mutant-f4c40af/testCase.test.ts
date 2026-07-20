import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const origin = new GeoPoint(89.9, 0);
    const distance = 1000; // 1 km
    const bearing = 0; // north
    const destination = GeoPoint.calculateDestination(origin.toObject(), distance, bearing);
    expect(destination.latitude).toBeCloseTo(89.90899321605661, 5); // expected latitude
    expect(destination.longitude).toBeCloseTo(0, 5); // expected longitude
  });
});