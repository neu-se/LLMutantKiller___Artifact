// Test to detect the mutation in q.js
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library ses environment check", () => {
  it("should properly handle ses environment initialization", () => {
    // The mutation removes the ses.ok() check and makesQ assignment
    // We need to test behavior that would be affected by this change

    // Create a mock ses object to simulate the Secure ECMAScript environment
    const mockSes = {
      ok: jest.fn(() => true),
      makeQ: undefined
    };

    // Store original global.ses if it exists
    const originalSes = global.ses;

    // Set up the mock ses environment
    global.ses = mockSes;

    // Re-require q to test the initialization with ses present
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const qWithSes = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // In the original code, ses.makeQ should be assigned
    // In the mutated code, this assignment is missing
    expect(mockSes.makeQ).toBeDefined();
    expect(typeof mockSes.makeQ).toBe("function");

    // Clean up
    global.ses = originalSes;
  });
});