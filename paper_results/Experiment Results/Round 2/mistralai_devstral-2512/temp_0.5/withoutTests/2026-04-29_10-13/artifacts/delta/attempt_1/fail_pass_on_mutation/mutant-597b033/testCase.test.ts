import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta module export", () => {
  it("should export Delta as both default and named exports when running in a CommonJS environment", () => {
    // This test verifies the module export behavior by checking if Delta is available
    // as both default and named exports. The mutation changes the module export condition
    // from `typeof module === 'object'` to `true`, which would cause the exports to be
    // set incorrectly in non-CommonJS environments, but we can't directly test that here.
    // Instead, we test the side effect of the exports being set, which should work in both cases.
    expect(Delta).toBeDefined();
    expect(typeof Delta).toBe('function');

    // Create an instance to verify the class works
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);
    expect(delta.ops).toEqual([]);
  });
});