import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(40.7128, -74.0060);
    const distance = 1000; // 1 km
    const bearing = 90; // east

    const destination = GeoPoint.calculateDestination({ latitude: point.latitude, longitude: point.longitude }, distance, bearing);
    expect(destination.longitude).toBeCloseTo(-73.9941, 4);
  });
});