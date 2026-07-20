// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Debug Mode Detection", () => {
  it("should not enable long stack support when Q_DEBUG is not set", () => {
    // Store original environment and Q state
    const originalEnv = process.env;
    const originalLongStackSupport = Q.longStackSupport;

    // Ensure Q_DEBUG is not set
    delete process.env.Q_DEBUG;

    // Force Q to re-evaluate the debug condition by reloading its state
    // We need to check the initial state before any promises are created
    const initialLongStackSupport = Q.longStackSupport;

    // Create a simple promise to ensure the library is initialized
    const testPromise = Q.resolve(42);

    // Verify that long stack support remains disabled when Q_DEBUG is not set
    expect(initialLongStackSupport).toBe(false);
    expect(Q.longStackSupport).toBe(false);

    // Restore original state
    process.env = originalEnv;
    Q.longStackSupport = originalLongStackSupport;
  });
});