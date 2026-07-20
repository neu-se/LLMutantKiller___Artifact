import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination with correct formula', () => {
    const point = new GeoPoint(0, 0);
    const distance = 10000;
    const bearing = 0;
    const destination = GeoPoint.calculateDestination({ latitude: point.latitude, longitude: point.longitude }, distance, bearing);
    const expectedLatitude = Math.asin(Math.sin(point.latitude * Math.PI / 180) * Math.cos(distance / 6371e3) + Math.cos(point.latitude * Math.PI / 180) * Math.sin(distance / 6371e3) * Math.cos(bearing * Math.PI / 180));
    expect(destination.latitude).toBeCloseTo(expectedLatitude * 180 / Math.PI, 5);
    expect(destination.longitude).toBeCloseTo(point.longitude, 5);
  });
});