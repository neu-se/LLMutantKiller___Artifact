import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe("GeoPoint", () => {
  it("should throw an error when latitude is less than or equal to -90 in the mutated code but not in the original code", () => {
    expect(() => new GeoPoint(-90, 0)).toThrow(RangeError);
    expect(() => new GeoPoint(-90.1, 0)).toThrow(RangeError);
  });
});