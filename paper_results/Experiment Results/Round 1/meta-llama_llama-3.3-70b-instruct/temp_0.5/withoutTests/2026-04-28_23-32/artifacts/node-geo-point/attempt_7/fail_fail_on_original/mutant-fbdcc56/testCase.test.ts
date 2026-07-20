import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate destination correctly for a specific case', () => {
    const point = new GeoPoint(0, 0);
    const distance = 100000; // 100 km
    const bearing = 90; // 90 degrees
    const destination = point.calculateDestination({ latitude: point.latitude, longitude: point.longitude }, distance, bearing);
    expect(destination.longitude).toBeCloseTo(0.8993, 4);
  });
});