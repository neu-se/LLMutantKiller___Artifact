import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.transform", () => {
  it("should return undefined when the result is an empty object", () => {
    const a = { key1: "value1" };
    const b = { key1: "value1" };
    const result = AttributeMap.transform(a, b, true);
    expect(result).toBeUndefined();
  });
});