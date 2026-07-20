import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint validation', () => {
  it('should throw TypeError when fromGeoJSON receives a symbol', () => {
    const symbol = Symbol('test');
    expect(() => {
      GeoPoint.fromGeoJSON(symbol as any);
    }).toThrow(TypeError);
  });
});