import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError with correct message when coordinates property is missing', () => {
    const invalidPoint = { type: 'Point' } as any;
    
    expect(() => {
      GeoPoint.fromGeoJSON(invalidPoint);
    }).toThrow('Object must have type and coordinates');
  });
});