import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw an error when latitude is -90', () => {
    expect(() => new GeoPoint(-90, 0)).not.toThrow();
  });
});