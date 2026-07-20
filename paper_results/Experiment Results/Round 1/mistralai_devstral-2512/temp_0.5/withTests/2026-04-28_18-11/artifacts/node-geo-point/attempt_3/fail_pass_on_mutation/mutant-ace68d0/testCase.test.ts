import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint validation', () => {
  it('should throw TypeError when fromGeoJSON receives invalid object structure', () => {
    expect(() => {
      GeoPoint.fromGeoJSON({} as any);
    }).toThrow(TypeError);

    expect(() => {
      GeoPoint.fromGeoJSON({ type: 'Point' } as any);
    }).toThrow(TypeError);

    expect(() => {
      GeoPoint.fromGeoJSON({ coordinates: [0, 0] } as any);
    }).toThrow(TypeError);
  });
});