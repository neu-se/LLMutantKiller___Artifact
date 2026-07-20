import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw error mentioning type and coordinates when coordinates property is missing', () => {
    const pointWithoutCoordinates = { type: 'Point' } as any;

    expect(() => {
      GeoPoint.fromGeoJSON(pointWithoutCoordinates);
    }).toThrow('Object must have type and coordinates');
  });
});