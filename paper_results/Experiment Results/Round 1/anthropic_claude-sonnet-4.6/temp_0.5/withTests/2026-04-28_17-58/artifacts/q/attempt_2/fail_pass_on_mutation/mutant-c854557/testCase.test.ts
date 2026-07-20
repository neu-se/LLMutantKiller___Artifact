import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack trace filtering", () => {
  it("should include user frames but exclude Q internal frames in long stack traces", async () => {
    Q.longStackSupport = true;

    try {
      function userFunction() {
        return Q.reject(new Error("test error from user code"));
      }

      const capturedStack = await new Promise<string>((resolve) => {
        userFunction().fail((err: Error) => {
          resolve(err.stack || "");
        });
      });

      // With original code: qStartingLine is correctly parsed (multi-digit line number),
      // so Q's internal frames ARE filtered out, and "promiseDispatch" / Q internals don't appear
      // With mutated code: qStartingLine is undefined (can't parse multi-digit line),
      // so Q's internal frames are NOT filtered, and they appear in the stack
      const hasQInternals = capturedStack.includes("promiseDispatch");
      expect(hasQInternals).toBe(false);
    } finally {
      Q.longStackSupport = false;
    }
  });
});