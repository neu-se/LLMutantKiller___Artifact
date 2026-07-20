import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library debug mode", () => {
  it("should not enable long stack support when Q_DEBUG is not set", () => {
    // Save original process.env
    const originalEnv = process.env;

    // Ensure Q_DEBUG is not set
    delete process.env.Q_DEBUG;

    // Verify long stack support is disabled by default
    expect(Q.longStackSupport).toBe(false);

    // Restore original process.env
    process.env = originalEnv;
  });
});