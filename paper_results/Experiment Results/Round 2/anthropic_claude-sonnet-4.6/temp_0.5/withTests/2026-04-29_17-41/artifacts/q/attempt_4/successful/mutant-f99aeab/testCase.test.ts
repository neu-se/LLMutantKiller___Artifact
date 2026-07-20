import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine", () => {
  it("should set qStartingLine so Q internal frames are filtered from long stack traces", (done) => {
    Q.longStackSupport = true;

    const d = Q.defer();

    d.promise.then(undefined, function (err: Error) {
      const stack = err.stack || "";
      const frameLines = stack.split("\n").filter((line: string) => line.trim().startsWith("at "));
      const hasQInternalFrames = frameLines.some((line: string) => /[/\\]q\.js:\d+/.test(line));

      // With original: Q internal frames filtered out (no q.js frames in stack)
      // With mutation: Q internal frames NOT filtered (q.js frames remain)
      expect(hasQInternalFrames).toBe(false);
      Q.longStackSupport = false;
      done();
    });

    d.reject(new Error("test"));
  }, 10000);
});