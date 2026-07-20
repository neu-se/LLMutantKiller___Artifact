// Test to detect the mutation in the deprecate function's warning message
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
const Q = qModule.Q || qModule;

describe("Q library deprecate function", () => {
  it("should properly format deprecation warning messages", () => {
    // Mock console.warn to capture the warning message
    const originalWarn = console.warn;
    const mockWarn = jest.fn();
    console.warn = mockWarn;

    // Create a simple test to trigger the deprecate function internally
    // We'll test Q.allResolved which is deprecated and uses the deprecate function
    const testPromise = Q.resolve("test");

    // Call the deprecated function
    Q.allResolved([testPromise]);

    // Restore console.warn
    console.warn = originalWarn;

    // Verify console.warn was called with the correct message
    expect(mockWarn).toHaveBeenCalled();
    const warningMessage = mockWarn.mock.calls[0][0];

    // The mutation removes " instead." from the warning message
    // Check that the warning contains " instead." which should be present in the original
    expect(warningMessage).toContain(" instead.");
  });
});