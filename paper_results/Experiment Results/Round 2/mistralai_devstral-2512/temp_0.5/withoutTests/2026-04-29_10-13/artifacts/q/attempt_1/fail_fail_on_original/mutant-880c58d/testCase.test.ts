import { Q } from "./q";

describe("Q library debug mode", () => {
  it("should not enable long stack support when Q_DEBUG is not set", () => {
    // Save original process.env
    const originalEnv = process.env;

    // Ensure Q_DEBUG is not set
    delete process.env.Q_DEBUG;

    // Import Q fresh to get the initial state
    const qInstance = require("./q");

    // Verify long stack support is disabled by default
    expect(qInstance.Q.longStackSupport).toBe(false);

    // Restore original process.env
    process.env = originalEnv;
  });
});