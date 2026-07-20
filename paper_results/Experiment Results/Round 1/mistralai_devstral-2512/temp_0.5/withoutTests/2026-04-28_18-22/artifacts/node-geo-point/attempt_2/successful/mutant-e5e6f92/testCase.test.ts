import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when coordinates property is missing', () => {
    const invalidPoint = {
      type: 'Point'
    };
    expect(() => {
      GeoPoint.fromGeoJSON(invalidPoint as any);
    }).toThrow('Object must have type and coordinates');
  });
});