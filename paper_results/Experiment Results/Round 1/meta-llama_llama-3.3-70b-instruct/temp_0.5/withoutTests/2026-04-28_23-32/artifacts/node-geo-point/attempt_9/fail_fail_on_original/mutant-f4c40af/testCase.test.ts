import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const distance = 100000; // 100 km
    const bearing = 0; // north

    const destination = GeoPoint.calculateDestination({ latitude: point.latitude, longitude: point.longitude }, distance, bearing);
    expect(destination.latitude).toBeCloseTo(0.8983, 4);
  });
});