const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should not track rejections when process is not an object", () => {
    const originalProcess = global.process;
    global.process = null;

    Q.resetUnhandledRejections();
    Q.reject("test reason");

    expect(Q.getUnhandledReasons().length).toBe(0);

    global.process = originalProcess;
  });
});