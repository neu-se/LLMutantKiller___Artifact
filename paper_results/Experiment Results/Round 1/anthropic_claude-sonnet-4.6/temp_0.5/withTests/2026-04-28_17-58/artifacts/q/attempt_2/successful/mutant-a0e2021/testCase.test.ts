describe("Q module initialization", () => {
  it("should not throw when process.env is undefined during module load", () => {
    const savedEnv = (process as any).env;
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");

    try {
      (process as any).env = undefined;
      delete require.cache[modulePath];

      expect(() => {
        require("../../../../../../../../../../../subject_repositories/q/q.js");
      }).not.toThrow();
    } finally {
      (process as any).env = savedEnv;
      delete require.cache[modulePath];
    }
  });
});