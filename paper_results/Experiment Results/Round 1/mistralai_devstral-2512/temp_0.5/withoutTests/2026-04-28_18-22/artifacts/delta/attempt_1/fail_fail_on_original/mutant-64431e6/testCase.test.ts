import { diff } from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.diff", () => {
  it("should handle non-object b parameter correctly", () => {
    const a = { key1: "value1" };
    const b = "not an object";
    const result = diff(a, b);
    expect(result).toEqual({ key1: null });
  });
});