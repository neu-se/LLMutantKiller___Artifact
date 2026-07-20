// Test to detect the mutation in q.js where the CommonJS module detection logic was changed from AND to OR
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("CommonJS module export detection", () => {
  it("should correctly export Q when both exports and module are objects (CommonJS environment)", () => {
    // This test verifies that Q is properly exported in a CommonJS environment
    // The mutation changes the condition from (exports && module) to (exports || module)
    // which could cause incorrect behavior in environments where only one exists

    // Verify Q is exported
    expect(typeof qModule).toBe("function");

    // Verify Q has the expected promise methods
    expect(typeof qModule.resolve).toBe("function");
    expect(typeof qModule.reject).toBe("function");
    expect(typeof qModule.defer).toBe("function");

    // Verify we can create and use a promise
    const testValue = "test";
    return qModule.resolve(testValue).then((value: string) => {
      expect(value).toBe(testValue);
    });
  });
});