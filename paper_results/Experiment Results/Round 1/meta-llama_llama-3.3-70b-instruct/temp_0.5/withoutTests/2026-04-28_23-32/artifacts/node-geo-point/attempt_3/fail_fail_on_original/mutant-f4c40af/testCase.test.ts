import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const distance = 1000; // 1 km
    const bearing = 0; // north

    const destination = GeoPoint.calculateDestination({ latitude: point.latitude, longitude: point.longitude }, distance, bearing);
    expect(destination.latitude).toBeCloseTo(0.008983, 5);
    expect(destination.longitude).toBeCloseTo(0, 5);
  });
});