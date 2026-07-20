import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace filtering", () => {
  it("should retain user code frames in error stack after long stack trace processing", (done) => {
    Q.longStackSupport = true;

    const err = new Error("sentinel error from userCode");

    Q.reject(err)
      .then(null, function(capturedErr: Error) {
        Q.longStackSupport = false;
        // With the original: isInternalFrame only removes Q-internal lines,
        // so user frames (containing "sentinel error from userCode" or this file's path) remain.
        // With the mutation: isInternalFrame always returns true, filterStackString
        // removes ALL lines, setting error.stack to "".
        const stack = capturedErr.stack || "";
        try {
          expect(stack).toContain("sentinel error from userCode");
          done();
        } catch(e) {
          done(e);
        }
      });
  });
});