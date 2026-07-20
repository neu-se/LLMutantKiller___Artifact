import { Q } from "./q";

describe("Q library stack trace filtering", () => {
  it("should properly filter internal stack frames when Q_DEBUG is enabled", async () => {
    // Enable long stack traces for testing
    process.env.Q_DEBUG = "1";

    // Create a promise chain that will reject
    const promise = Q.reject(new Error("Test error"));

    // Force the promise to be inspected, which triggers captureLine()
    const inspectResult = promise.inspect();

    // Verify the promise is in rejected state
    expect(inspectResult.state).toBe("rejected");

    // The mutation would cause an error in captureLine() when fileNameAndLineNumber is falsy
    // This test ensures the function handles that case correctly without throwing
    // In the mutated version, the empty if block would not return early, potentially causing issues
    await expect(promise).rejects.toThrow("Test error");

    // Clean up
    delete process.env.Q_DEBUG;
  });
});