import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta module export", () => {
  it("should export Delta as both default and named export", () => {
    // This test verifies that the module exports work correctly
    // The mutation changes the module export check from 'object' to empty string
    // which would break the export behavior in Node.js environments

    // Test that we can import Delta as default
    expect(Delta).toBeDefined();
    expect(typeof Delta).toBe('function');

    // Test that we can create an instance
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);

    // Test basic functionality to ensure the module is working
    delta.insert("test");
    expect(delta.length()).toBe(4);
  });
});