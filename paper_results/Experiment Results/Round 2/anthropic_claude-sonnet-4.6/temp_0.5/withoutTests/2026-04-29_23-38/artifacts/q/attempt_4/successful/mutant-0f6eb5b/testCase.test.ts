describe("Q longStackSupport with Q_DEBUG env var", () => {
  it("should set longStackSupport to true when Q_DEBUG environment variable is set", () => {
    process.env.Q_DEBUG = "1";
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");
    delete process.env.Q_DEBUG;
    expect(freshQ.longStackSupport).toBe(true);
  });
});