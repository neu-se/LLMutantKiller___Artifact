// Test to detect the mutation in the deprecate function's warning message
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q deprecate function", () => {
  it("should include the alternative in the deprecation warning message", () => {
    // Mock console.warn to capture the warning message
    const originalWarn = console.warn;
    const mockWarn = jest.fn();
    console.warn = mockWarn;

    // Create a test function that uses the deprecate wrapper
    const testFn = jest.fn(() => "test result");
    const deprecatedFn = Q.deprecate(testFn, "Test function is deprecated", "Use newFunction instead");

    // Call the deprecated function
    const result = deprecatedFn();

    // Restore console.warn
    console.warn = originalWarn;

    // Verify the function still works
    expect(result).toBe("test result");

    // Verify console.warn was called with the correct message
    expect(mockWarn).toHaveBeenCalled();
    const warningMessage = mockWarn.mock.calls[0][0];

    // The mutation removes " instead." from the warning message
    // Check that the warning contains " instead." which should be present in the original
    expect(warningMessage).toContain(" instead.");
  });
});