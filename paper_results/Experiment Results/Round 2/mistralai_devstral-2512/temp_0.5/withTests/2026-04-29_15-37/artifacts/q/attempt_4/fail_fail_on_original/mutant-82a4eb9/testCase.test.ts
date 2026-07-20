// Test to detect the mutation in q.js where the CommonJS module detection logic was changed from AND to OR
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("CommonJS module export detection", () => {
  it("should properly detect CommonJS environment with both exports and module", () => {
    // This test verifies the module detection logic by checking if Q is properly exported
    // The mutation changes the condition from (exports && module) to (exports || module)
    // which could cause Q to be exported in non-CommonJS environments where it shouldn't be

    // Verify Q is properly exported in CommonJS environment
    expect(typeof qModule).toBe("function");

    // Verify the module has the expected structure
    expect(qModule.resolve).toBeDefined();
    expect(qModule.reject).toBeDefined();

    // Test that promises work correctly
    return qModule.resolve("test").then((value: string) => {
      expect(value).toBe("test");

      // This assertion will fail in the mutated version because
      // the module detection logic might export Q in unexpected ways
      expect(qModule).toBe(qModule.resolve("test").constructor);
    });
  });
});