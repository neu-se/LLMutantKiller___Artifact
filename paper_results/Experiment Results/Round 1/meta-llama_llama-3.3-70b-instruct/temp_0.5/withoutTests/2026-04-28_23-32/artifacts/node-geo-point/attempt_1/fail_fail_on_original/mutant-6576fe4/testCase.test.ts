import { GeoPoint } from "../../../src/geo-point";

describe("GeoPoint", () => {
  it("should throw an error when both latitude and longitude are not numbers", () => {
    expect(() => new GeoPoint("a", "b")).toThrowError(RangeError);
  });
});