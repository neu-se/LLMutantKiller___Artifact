import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("retain() mutation test", () => {
  it("should not return early when length is a non-number", () => {
    const delta = new Delta();
    // Call retain with a string (non-number) - should not return early in original code
    // but will in mutated code due to the changed condition
    const result = delta.retain("not-a-number");
    // The original code should create a retain operation with the string
    // The mutated code will return early and not create the operation
    expect(result.ops).toHaveLength(1);
    expect(result.ops[0]).toEqual({ retain: "not-a-number" });
  });
});