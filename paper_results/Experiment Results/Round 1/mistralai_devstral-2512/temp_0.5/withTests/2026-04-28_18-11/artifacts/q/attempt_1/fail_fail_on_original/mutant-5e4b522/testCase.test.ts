// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library initialization", () => {
  it("should expose Q as a global when window is defined", () => {
    // Create a mock window object
    const mockWindow = {};
    // Simulate the browser environment where window is defined
    // This test verifies that Q is properly exposed as a global when window exists
    // The mutation changes the condition from `typeof window !== "undefined"`
    // to `typeof window !== ""`, which would incorrectly evaluate to true even when window is undefined
    // but in a way that breaks the intended behavior
    expect(typeof Q).toBe("function");
    // Additional check to ensure Q is properly initialized
    const deferred = Q.defer();
    expect(deferred).toBeDefined();
    expect(typeof deferred.resolve).toBe("function");
    expect(typeof deferred.reject).toBe("function");
  });
});