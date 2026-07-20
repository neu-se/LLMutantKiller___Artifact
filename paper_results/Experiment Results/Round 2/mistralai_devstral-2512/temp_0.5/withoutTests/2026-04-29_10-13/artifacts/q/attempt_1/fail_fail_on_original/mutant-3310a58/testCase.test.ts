import { Q } from "./q";

describe("Q long stack support", () => {
  it("should enable long stack support when Q_DEBUG is set", () => {
    // Save original env
    const originalEnv = process.env;

    // Set Q_DEBUG to enable long stack support
    process.env.Q_DEBUG = "1";

    // Reload Q to pick up the new environment variable
    // We need to delete the cache to force a reload
    delete require.cache[require.resolve("./q")];
    const { Q: QWithDebug } = require("./q");

    // Verify that long stack support is enabled
    expect(QWithDebug.longStackSupport).toBe(true);

    // Restore original env
    process.env = originalEnv;
  });
});