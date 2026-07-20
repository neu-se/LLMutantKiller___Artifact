import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint validation', () => {
  it('should throw TypeError when fromObject receives undefined input', () => {
    expect(() => {
      GeoPoint.fromObject(undefined as any);
    }).toThrow(TypeError);
  });
});