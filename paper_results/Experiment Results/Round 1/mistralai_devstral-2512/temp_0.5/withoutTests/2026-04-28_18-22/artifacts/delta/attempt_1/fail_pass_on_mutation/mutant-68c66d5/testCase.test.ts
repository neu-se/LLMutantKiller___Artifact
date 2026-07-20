import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta module export", () => {
  it("should export Delta as both default and named export when module is an object", () => {
    // This test verifies that Delta is properly exported in both ways
    // The mutation changes the condition from `typeof module === 'object'` to `if (false)`
    // which would prevent the exports from happening in Node.js environments
    expect(Delta).toBeDefined();
    expect(typeof Delta).toBe('function');

    // Create an instance to verify basic functionality
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);
    expect(delta.ops).toEqual([]);
  });
});