const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should track rejections when process is an object without emit function", () => {
    const originalProcess = global.process;
    delete global.process;

    Q.resetUnhandledRejections();
    Q.reject("test reason");

    expect(Q.getUnhandledReasons().length).toBe(0);

    global.process = originalProcess;
  });
});