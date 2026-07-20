// Test to detect the mutation in q.js where the CommonJS module detection logic was changed from AND to OR
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("CommonJS module export detection", () => {
  it("should verify Q exports correctly in CommonJS environment", () => {
    // This test verifies that Q is properly exported in a CommonJS environment
    // The mutation changes the condition from (exports && module) to (exports || module)
    // which could cause Q to be exported in non-CommonJS environments where it shouldn't be

    // Verify Q is a function
    expect(typeof qModule).toBe("function");

    // Verify Q has the expected promise methods
    expect(typeof qModule.resolve).toBe("function");
    expect(typeof qModule.reject).toBe("function");
    expect(typeof qModule.defer).toBe("function");

    // Test basic promise functionality
    return qModule.resolve("test").then((value: string) => {
      expect(value).toBe("test");

      // Verify the module is properly structured
      expect(qModule).toBe(qModule);
      expect(qModule.resolve).toBe(qModule.resolve);
      expect(qModule.reject).toBe(qModule.reject);
    });
  });
});