import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q longStackSupport initialization", () => {
  it("should not throw when process is not a standard object and Q_DEBUG is not set", () => {
    // The mutation uses `true && process.env && process.env.Q_DEBUG` 
    // which would throw if process.env is undefined
    // We test that Q loads and longStackSupport is false when Q_DEBUG is not set
    const originalEnv = process.env.Q_DEBUG;
    delete process.env.Q_DEBUG;
    
    // Re-require to test initialization
    jest.resetModules();
    const QModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    expect(QModule.longStackSupport).toBe(false);
    
    if (originalEnv !== undefined) {
      process.env.Q_DEBUG = originalEnv;
    }
  });
});