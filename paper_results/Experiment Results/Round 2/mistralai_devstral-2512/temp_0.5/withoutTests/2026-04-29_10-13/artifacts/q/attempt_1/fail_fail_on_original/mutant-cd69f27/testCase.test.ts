// Test case to detect the mutation in q.js
import { Q } from "./q.js";

describe("Q library initialization in SES environment", () => {
  it("should properly initialize Q in a Secure EcmaScript environment", () => {
    // Create a mock SES environment
    const mockSes = {
      ok: jest.fn().mockReturnValue(true),
      makeQ: jest.fn()
    };

    // Store the original global.ses if it exists
    const originalSes = global.ses;

    // Set up the mock SES environment
    global.ses = mockSes;

    // Reset the module cache to force re-evaluation
    delete require.cache[require.resolve("./q.js")];

    // Re-import Q to test the initialization
    const { Q: QInSes } = require("./q.js");

    // Verify that ses.makeQ was called with the Q definition
    expect(mockSes.makeQ).toHaveBeenCalled();

    // Clean up
    global.ses = originalSes;
  });
});