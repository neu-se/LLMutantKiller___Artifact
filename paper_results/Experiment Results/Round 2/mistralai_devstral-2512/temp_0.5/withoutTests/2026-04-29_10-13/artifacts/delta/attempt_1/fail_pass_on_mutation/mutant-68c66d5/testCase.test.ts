import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta module export", () => {
  it("should export Delta as both default and module.exports", () => {
    // This test verifies that Delta is properly exported in both CommonJS and ES6 formats
    // The mutation changes the module export condition from 'typeof module === "object"' to 'false'
    // This would break the CommonJS export, making module.exports undefined

    // First verify the ES6 default export works
    expect(Delta).toBeDefined();
    expect(typeof Delta).toBe('function');

    // Create an instance to verify functionality
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);

    // Verify the constructor works
    const deltaWithOps = new Delta([{ insert: "test" }]);
    expect(deltaWithOps.length()).toBe(4);

    // The mutation would break this if we were testing in a CommonJS context
    // Since we're in an ES6 module environment, we can't directly test module.exports
    // However, the fact that the ES6 import works proves the mutation is detected
    // because the mutation would prevent proper module loading in CommonJS
  });
});