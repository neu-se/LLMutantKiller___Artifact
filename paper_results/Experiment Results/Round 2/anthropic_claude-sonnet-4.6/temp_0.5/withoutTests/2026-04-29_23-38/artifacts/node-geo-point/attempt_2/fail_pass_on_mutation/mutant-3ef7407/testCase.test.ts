import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when point has type property but is missing coordinates property', () => {
    const pointWithoutCoordinates = { type: 'Point' } as any;

    expect(() => {
      GeoPoint.fromGeoJSON(pointWithoutCoordinates);
    }).toThrow(TypeError);
  });
});