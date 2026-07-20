import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when only coordinates property is missing', () => {
    const pointWithoutCoordinates = {
      type: 'Point'
    };

    expect(() => {
      GeoPoint.fromGeoJSON(pointWithoutCoordinates as any);
    }).toThrow(TypeError);
  });
});