import { transform } from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.transform", () => {
  it("should return undefined when attributes object is empty", () => {
    const a = { key1: "value1" };
    const b = {};
    const result = transform(a, b, true);
    expect(result).toBeUndefined();
  });
});