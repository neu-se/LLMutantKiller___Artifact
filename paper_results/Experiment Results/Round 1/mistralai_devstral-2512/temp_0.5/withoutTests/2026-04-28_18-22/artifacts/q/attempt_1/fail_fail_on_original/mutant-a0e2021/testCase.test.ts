import { Q } from "./q";

describe("Q long stack support", () => {
  it("should enable long stack support when Q_DEBUG is set in process.env", () => {
    // Save original env
    const originalEnv = process.env.Q_DEBUG;

    // Set Q_DEBUG to enable long stack support
    process.env.Q_DEBUG = "1";

    // Import Q fresh to get the modified behavior
    // We need to clear the module cache to get a fresh instance
    delete require.cache[require.resolve("./q")];
    const { Q: QWithDebug } = require("./q");

    // Verify long stack support is enabled
    expect(QWithDebug.longStackSupport).toBe(true);

    // Restore original env
    if (originalEnv === undefined) {
      delete process.env.Q_DEBUG;
    } else {
      process.env.Q_DEBUG = originalEnv;
    }
  });
});