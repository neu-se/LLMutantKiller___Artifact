import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should not throw an error when creating a GeoPoint from a GeoJSON object with a valid type', () => {
    const validPoint = { type: 'Point', coordinates: [1, 2] };
    expect(() => GeoPoint.fromGeoJSON(validPoint)).not.toThrow();
  });
});