import { diff } from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.diff", () => {
  it("should handle non-object 'a' parameter by treating it as empty object", () => {
    const result = diff(null as any, { key: "value" });
    expect(result).toEqual({ key: "value" });
  });
});