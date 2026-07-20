import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta insert method", () => {
  it("should handle empty string insertion with number argument", () => {
    const delta = new Delta();
    // @ts-expect-error - deliberately passing a number to test the mutation
    delta.insert(123);
    expect(delta.ops.length).toBe(1);
    expect(delta.ops[0].insert).toBe(123);
  });
});