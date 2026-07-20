import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should create a GeoPoint from an object with latitude and longitude', () => {
    const object = { latitude: 40.7128, longitude: -74.0060 };
    const geoPoint = GeoPoint.fromObject(object);
    if (geoPoint === null || geoPoint === undefined) {
      throw new Error('GeoPoint is null or undefined');
    }
    expect(geoPoint).toHaveProperty('latitude', object.latitude);
    expect(geoPoint).toHaveProperty('longitude', object.longitude);
    expect(geoPoint.latitude).toBeCloseTo(object.latitude);
    expect(geoPoint.longitude).toBeCloseTo(object.longitude);
    expect(geoPoint instanceof GeoPoint).toBe(true);
    expect(() => geoPoint.toString()).not.toThrowError();
    expect(geoPoint.toObject()).toEqual(object);
    expect(geoPoint.toGeoJSON()).toEqual({ type: 'Point', coordinates: [object.longitude, object.latitude] });
    expect(geoPoint.toLatLngArray()).toEqual([object.latitude, object.longitude]);
    expect(geoPoint.toLngLatArray()).toEqual([object.longitude, object.latitude]);
    expect(geoPoint.calculateDistance(new GeoPoint(40.7128, -74.0061))).toBeGreaterThan(0);
    expect(geoPoint.calculateBearing(new GeoPoint(40.7128, -74.0061))).toBeGreaterThan(0);
    expect(geoPoint.adjustPrecision(5).latitude).toBeCloseTo(object.latitude, 5);
    expect(geoPoint.adjustPrecision(5).longitude).toBeCloseTo(object.longitude, 5);
  });
});