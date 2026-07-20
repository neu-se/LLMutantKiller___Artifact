import { GeoPoint } from "../../../../../../../src/geo-point";

describe('GeoPoint', () => {
  it('should create a GeoPoint from a valid GeoJSON object', () => {
    const point = { type: 'Point', coordinates: [1.0, 2.0] };
    const geoPoint = GeoPoint.fromGeoJSON(point);
    expect(geoPoint.longitude).toBe(1.0);
    expect(geoPoint.latitude).toBe(2.0);
  });
});