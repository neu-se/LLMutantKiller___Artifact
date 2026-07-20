import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when point has type but no coordinates property', () => {
    const invalidPoint = { type: 'Point' } as any;

    expect(() => {
      GeoPoint.fromGeoJSON(invalidPoint);
    }).toThrow(TypeError);
  });
});