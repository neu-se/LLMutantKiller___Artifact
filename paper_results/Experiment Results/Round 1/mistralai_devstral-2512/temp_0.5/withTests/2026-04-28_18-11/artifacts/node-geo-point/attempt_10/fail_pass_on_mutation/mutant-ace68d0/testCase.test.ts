import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint validation', () => {
  it('should throw TypeError when fromObject receives a boolean', () => {
    expect(() => {
      GeoPoint.fromObject(false as any);
    }).toThrow(TypeError);
  });
});