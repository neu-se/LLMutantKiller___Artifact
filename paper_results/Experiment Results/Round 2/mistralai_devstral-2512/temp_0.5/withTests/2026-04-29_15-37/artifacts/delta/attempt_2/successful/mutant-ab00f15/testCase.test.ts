import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("retain() mutation test", () => {
  it("should create retain op when length is empty string", () => {
    const delta = new Delta();
    // Empty string is <= 0 when coerced to number, but is not a number
    // Original code: won't return early because typeof "" === "string"
    // Mutated code: will return early because true && "" <= 0
    const result = delta.retain("");
    // Original should create the operation, mutated should not
    expect(result.ops).toHaveLength(1);
    expect(result.ops[0]).toEqual({ retain: "" });
  });
});