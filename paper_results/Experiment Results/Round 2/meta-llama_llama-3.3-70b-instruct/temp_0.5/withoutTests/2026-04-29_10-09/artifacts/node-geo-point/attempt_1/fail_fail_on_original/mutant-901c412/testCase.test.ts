import { GeoPoint } from "../../../src/geo-point";

describe("GeoPoint", () => {
  it("should throw an error when latitude is less than -90", () => {
    expect(() => new GeoPoint(-90.1, 0)).toThrow(RangeError);
    expect(() => new GeoPoint(-90, 0)).not.toThrow(RangeError);
  });
});