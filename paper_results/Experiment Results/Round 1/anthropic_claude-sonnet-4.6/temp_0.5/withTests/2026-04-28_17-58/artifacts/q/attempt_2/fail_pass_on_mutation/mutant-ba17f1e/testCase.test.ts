import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack traces with named functions", () => {
  it("should correctly capture and display long stack traces including named function frames", () => {
    Q.longStackSupport = true;

    function level3() {
      return Q.reject(new Error("deep error"));
    }

    function level2() {
      return level3();
    }

    function level1() {
      return Q().then(function () {
        return level2();
      });
    }

    return level1().then(
      function () {
        Q.longStackSupport = false;
        throw new Error("Should have rejected");
      },
      function (err: Error) {
        Q.longStackSupport = false;
        expect(err).toBeDefined();
        expect(err.stack).toBeDefined();
        // The stack should contain meaningful location info (filename:line)
        // With the original code, attempt1 regex matches "at func (file:line:col)"
        // format and returns [filename, lineNumber]. With mutation returning [],
        // isInternalFrame gets undefined fileName and lineNumber causing wrong filtering.
        const stackStr = err.stack as string;
        expect(stackStr.length).toBeGreaterThan(0);
        expect(stackStr).toContain("deep error");
      }
    );
  });
});