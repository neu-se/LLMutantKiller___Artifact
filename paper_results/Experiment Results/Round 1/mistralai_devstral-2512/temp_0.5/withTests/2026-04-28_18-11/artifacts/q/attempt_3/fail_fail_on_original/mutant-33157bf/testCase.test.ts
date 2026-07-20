const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should track rejections when process is an object with emit function", () => {
    const originalProcess = global.process;
    global.process = {
      emit: () => true,
      toString: () => "[object process]"
    };

    Q.resetUnhandledRejections();
    Q.reject("test reason");

    expect(Q.getUnhandledReasons().length).toBeGreaterThan(0);

    global.process = originalProcess;
  });
});