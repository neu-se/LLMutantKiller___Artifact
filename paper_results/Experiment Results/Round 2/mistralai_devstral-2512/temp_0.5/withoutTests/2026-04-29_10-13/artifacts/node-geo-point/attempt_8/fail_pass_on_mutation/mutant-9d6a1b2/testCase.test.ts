import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when argument is missing latitude property', () => {
    expect(() => {
      GeoPoint.fromObject({ longitude: -74.0060 } as any);
    }).toThrow(TypeError);
  });
});