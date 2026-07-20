import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.diff", () => {
  it("should return undefined when both objects are empty", () => {
    const result = AttributeMap.diff({}, "not an object" as any);
    expect(result).toBeUndefined();
  });
});