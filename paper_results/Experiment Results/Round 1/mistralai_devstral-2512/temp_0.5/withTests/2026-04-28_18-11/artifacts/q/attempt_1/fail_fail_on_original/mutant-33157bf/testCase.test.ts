import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not track rejections when process is an object without emit function", () => {
    const originalProcess = global.process;
    global.process = { toString: () => "[object process]" };

    Q.resetUnhandledRejections();
    Q.reject("test reason");

    expect(Q.getUnhandledReasons().length).toBe(0);

    global.process = originalProcess;
  });
});