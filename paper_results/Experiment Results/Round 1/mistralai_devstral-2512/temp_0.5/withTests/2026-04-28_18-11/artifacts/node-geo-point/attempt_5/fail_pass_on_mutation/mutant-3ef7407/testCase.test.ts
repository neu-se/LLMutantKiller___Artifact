import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when point has type but missing coordinates', () => {
    const invalidPoint = {
      type: 'Point',
      otherProperty: 'value'
    };

    expect(() => {
      GeoPoint.fromGeoJSON(invalidPoint as any);
    }).toThrow(TypeError);
  });
});