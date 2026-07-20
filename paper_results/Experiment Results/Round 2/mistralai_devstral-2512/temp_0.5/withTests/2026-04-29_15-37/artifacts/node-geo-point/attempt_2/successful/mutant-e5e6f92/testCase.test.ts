import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when GeoJSON object is missing coordinates property', () => {
    const invalidGeoJSON = {
      type: 'Point'
      // Missing coordinates property
    };

    expect(() => {
      GeoPoint.fromGeoJSON(invalidGeoJSON);
    }).toThrow('Object must have type and coordinates');
  });
});