import { compose } from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should handle undefined values correctly when merging attributes", () => {
    const a = { key1: "valueA", key2: undefined };
    const b = { key2: "valueB" };

    const result = compose(a, b);

    expect(result).toEqual({ key1: "valueA", key2: "valueB" });
  });
});