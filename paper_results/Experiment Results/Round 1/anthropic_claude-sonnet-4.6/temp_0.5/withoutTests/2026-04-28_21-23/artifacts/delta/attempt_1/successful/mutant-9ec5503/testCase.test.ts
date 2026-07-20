import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta.compose", () => {
  it("should correctly compose a delta with an empty delta without throwing", () => {
    const delta = new Delta().insert("hello");
    const empty = new Delta();
    
    // In the original code, firstOther != null check prevents null access
    // In the mutated code, true && means it always tries to access firstOther.attributes
    // which throws when firstOther is null (empty delta has no ops)
    expect(() => {
      const result = delta.compose(empty);
      // The result of composing with empty delta should be the original delta
      expect(result.ops).toEqual([{ insert: "hello" }]);
    }).not.toThrow();
  });
});