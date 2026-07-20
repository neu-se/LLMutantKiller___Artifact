import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe("GeoPoint", () => {
  it("should throw an error when both latitude and longitude are not numbers", () => {
    expect(() => new GeoPoint("a", "b")).toThrowError(RangeError);
    expect(() => new GeoPoint(1, "b")).toThrowError(RangeError);
    expect(() => new GeoPoint("a", 2)).toThrowError(RangeError);
  });
});