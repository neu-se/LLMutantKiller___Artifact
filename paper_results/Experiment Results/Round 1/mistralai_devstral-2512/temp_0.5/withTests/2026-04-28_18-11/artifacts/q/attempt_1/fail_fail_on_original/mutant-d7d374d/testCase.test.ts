// Test case to detect the mutation in the deprecate function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function behavior", () => {
  it("should not call console.warn when console is undefined in the mutated version", () => {
    // Store the original console.warn
    const originalWarn = console.warn;
    let warnCalled = false;

    // Mock console.warn to track if it's called
    console.warn = () => {
      warnCalled = true;
    };

    // Create a test function to deprecate
    const testFn = () => "test result";
    const deprecatedFn = Q.deprecate(testFn, "testFn", "newFn");

    // In the original code, console.warn should be called
    // In the mutated code, console.warn should not be called because the condition is always true
    // and console is undefined in this test environment
    deprecatedFn();

    // Restore console.warn
    console.warn = originalWarn;

    // In the original code, this would be true
    // In the mutated code, this would be false because console is undefined
    expect(warnCalled).toBe(true);
  });
});