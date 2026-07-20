import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint validation', () => {
  it('should throw TypeError when fromObject receives null input', () => {
    expect(() => {
      GeoPoint.fromObject(null as any);
    }).toThrow(TypeError);
  });
});