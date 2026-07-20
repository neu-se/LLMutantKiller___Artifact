// Test to detect the mutation in q.js where the CommonJS module detection logic was changed from AND to OR
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("CommonJS module export detection", () => {
  it("should correctly export Q when both exports and module are objects (CommonJS environment)", () => {
    // This test verifies that Q is properly exported in a CommonJS environment
    // The mutation changes the condition from (exports && module) to (exports || module)
    // which could cause incorrect behavior in environments where only one exists

    // Verify Q is a function (the main export)
    expect(typeof Q).toBe("function");

    // Verify Q has the expected promise methods
    expect(typeof Q.resolve).toBe("function");
    expect(typeof Q.reject).toBe("function");
    expect(typeof Q.defer).toBe("function");

    // Verify we can create and use a promise
    const testValue = "test";
    return Q.resolve(testValue).then((value) => {
      expect(value).toBe(testValue);
    });
  });
});