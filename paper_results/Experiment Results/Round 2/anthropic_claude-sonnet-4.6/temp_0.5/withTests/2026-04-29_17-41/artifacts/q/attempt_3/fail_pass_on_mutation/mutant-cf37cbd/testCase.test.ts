import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack trace filtering with column number parsing", () => {
  it("should filter Q internal frames leaving only user code in stack traces", (done) => {
    Q.longStackSupport = true;

    function userFunction() {
      return Q().then(function () {
        throw new Error("test");
      });
    }

    userFunction().catch(function(err: any) {
      Q.longStackSupport = false;
      const stack: string = err.stack || "";
      const lines = stack.split("\n");
      // Count lines that reference q.js - with proper filtering these should be absent
      const qLines = lines.filter((line: string) => /q\.js/.test(line) && line.trim().startsWith("at "));
      expect(qLines.length).toBe(0);
      done();
    });
  });
});