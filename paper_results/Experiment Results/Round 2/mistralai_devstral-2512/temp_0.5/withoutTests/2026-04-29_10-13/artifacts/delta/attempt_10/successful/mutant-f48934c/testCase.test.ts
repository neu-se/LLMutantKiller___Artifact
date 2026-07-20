import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta insert method", () => {
  it("should handle empty string insertion with undefined argument", () => {
    const delta = new Delta();
    // @ts-expect-error - deliberately passing undefined to test the mutation
    delta.insert(undefined);
    expect(delta.ops.length).toBe(1);
    expect(delta.ops[0].insert).toBeUndefined();
  });
});