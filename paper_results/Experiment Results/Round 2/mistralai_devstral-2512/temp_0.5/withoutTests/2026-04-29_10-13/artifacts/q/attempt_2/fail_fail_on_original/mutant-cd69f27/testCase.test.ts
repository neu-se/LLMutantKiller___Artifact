// Test case to detect the mutation in q.js
import * as qModule from "./q.js";

describe("Q library SES environment handling", () => {
  it("should correctly handle SES environment initialization", () => {
    // Create a mock SES environment
    const mockSes = {
      ok: () => true,
      makeQ: jest.fn()
    };

    // Store the original global.ses if it exists
    const originalSes = (global as any).ses;

    // Set up the mock SES environment
    (global as any).ses = mockSes;

    // Force re-evaluation of the module by deleting it from cache
    delete require.cache[require.resolve("./q.js")];

    // Re-import Q to test the initialization
    const Q = require("./q.js");

    // Verify that ses.makeQ was called with the Q definition
    expect(mockSes.makeQ).toHaveBeenCalled();

    // Clean up
    (global as any).ses = originalSes;
  });
});