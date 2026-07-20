import { compose } from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should handle non-object input for the first argument by treating it as an empty object", () => {
    const result = compose("invalid" as any, { key: "value" });
    expect(result).toEqual({ key: "value" });
  });
});