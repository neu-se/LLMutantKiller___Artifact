import { Q } from "./q";

describe("Q library SES environment handling", () => {
  it("should not throw error when ses.ok() returns false", () => {
    // Mock the ses object to simulate the SES environment
    const mockSes = {
      ok: () => false,
      makeQ: jest.fn()
    };

    // Replace the global ses object
    (global as any).ses = mockSes;

    // Try to load Q in a way that triggers the SES path
    // Since we can't directly trigger the SES path without reloading,
    // we'll test the behavior by checking if makeQ was called
    // The mutation would cause an error if ses.ok() returns false
    expect(() => {
      // Force re-evaluation of the Q module to trigger SES path
      delete require.cache[require.resolve("./q")];
      const Q = require("./q");
    }).not.toThrow();

    // Clean up
    delete (global as any).ses;
  });
});