import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function behavior", () => {
  it("should not log deprecation warning when console.warn is not available", () => {
    // Store the original console.warn
    const originalWarn = console.warn;
    // Mock console.warn to track if it's called
    let warnCalled = false;
    console.warn = () => {
      warnCalled = true;
    };

    // Temporarily remove console.warn to simulate its unavailability
    delete (console as any).warn;

    // Create a deprecated function
    const deprecatedFn = Q.deprecate(() => "result", "testFn", "use newFn");

    // Call the deprecated function
    const result = deprecatedFn();

    // Restore console.warn
    console.warn = originalWarn;

    // Verify the function still works
    expect(result).toBe("result");
    // Verify console.warn was not called (since it was unavailable)
    expect(warnCalled).toBe(false);
  });
});