import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta module export", () => {
  it("should export Delta as both default and module.exports", () => {
    // This test verifies that Delta is properly exported in both CommonJS and ES module formats
    // The mutation changes the module export check from 'object' to empty string
    // This should cause the module export to fail in CommonJS environments

    // Create a simple delta to verify basic functionality
    const delta = new Delta().insert("test");
    expect(delta.length()).toBe(4);

    // Verify the module exports are correct
    expect(typeof Delta).toBe("function");
    expect(typeof Delta.default).toBe("function");
  });
});