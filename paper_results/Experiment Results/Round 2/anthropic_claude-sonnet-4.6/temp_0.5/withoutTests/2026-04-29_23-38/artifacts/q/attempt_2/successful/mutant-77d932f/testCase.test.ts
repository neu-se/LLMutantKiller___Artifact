import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber stack filtering", () => {
  it("should filter Q internal frames from stack traces", async () => {
    Q.longStackSupport = true;

    let capturedStack = "";

    await Q.promise((resolve: Function, reject: Function) => {
      Q.nextTick(() => {
        reject(new Error("test error"));
      });
    }).fail((err: Error) => {
      capturedStack = err.stack || "";
    });

    // With original code: getFileNameAndLineNumber parses stack lines correctly,
    // so isInternalFrame identifies Q's own lines (from q.js) and filterStackString
    // removes them. The resulting stack should NOT contain references to q.js internals.
    // With mutated code: getFileNameAndLineNumber returns undefined, isInternalFrame
    // always returns false, so Q's internal frames are NOT filtered out.
    // q.js internal frames like "promiseDispatch", "flush", etc. would appear.
    expect(capturedStack).not.toMatch(/q\.js/);
  });
});