// Test to detect the mutation in q.js
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library ses environment check", () => {
  it("should properly handle ses environment initialization", () => {
    // The mutation removes the ses.ok() check and makesQ assignment
    // We need to test behavior that would be affected by this change

    // Create a mock ses object to simulate the Secure ECMAScript environment
    const mockSes = {
      ok: () => true,
      makeQ: undefined
    };

    // Store original global.ses if it exists
    const originalSes = (global as any).ses;

    // Set up the mock ses environment
    (global as any).ses = mockSes;

    // Re-require q to test the initialization with ses present
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    require("../../../../../../../../../../../subject_repositories/q/q.js");

    // In the original code, ses.makeQ should be assigned to the definition function
    // In the mutated code, this assignment is missing
    if (mockSes.makeQ) {
      expect(typeof mockSes.makeQ).toBe("function");

      // Verify that the assigned function is actually the Q definition
      const qInstance = mockSes.makeQ();
      expect(qInstance).toBeDefined();
      expect(typeof qInstance.defer).toBe("function");
    } else {
      fail("ses.makeQ was not assigned, indicating the mutation is present");
    }

    // Clean up
    (global as any).ses = originalSes;
  });
});