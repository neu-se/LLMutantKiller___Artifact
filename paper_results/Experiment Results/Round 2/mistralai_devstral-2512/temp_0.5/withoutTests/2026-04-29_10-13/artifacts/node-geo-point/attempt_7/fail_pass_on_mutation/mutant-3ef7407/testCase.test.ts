import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when coordinates property is missing but type property exists', () => {
    const pointWithoutCoordinates = {
      type: 'Point'
    };

    expect(() => {
      GeoPoint.fromGeoJSON(pointWithoutCoordinates as any);
    }).toThrow(TypeError);
  });
});