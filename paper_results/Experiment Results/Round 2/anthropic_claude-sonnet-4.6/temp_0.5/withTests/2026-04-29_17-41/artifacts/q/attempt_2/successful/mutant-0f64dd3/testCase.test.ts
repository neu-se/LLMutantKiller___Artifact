import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine", () => {
  it("filters Q internal frames from long stack traces so that q.js lines are absent after filtering", () => {
    Q.longStackSupport = true;

    const promise = Q.fcall(function () {
      throw new Error("sentinel error");
    }).fail(function (err: Error) {
      const stack = err.stack || "";
      expect(err.message).toBe("sentinel error");

      // With original code:
      //   captureLine() correctly parses the stack, sets qFileName and returns a line number.
      //   qStartingLine and qEndingLine are set to actual numbers.
      //   isInternalFrame() correctly identifies q.js frames and filterStackString removes them.
      //   => No q.js lines remain in the filtered stack.
      //
      // With mutated code (if (!fileNameAndLineNumber) → if (fileNameAndLineNumber)):
      //   captureLine() returns undefined immediately when fileNameAndLineNumber is truthy (normal case).
      //   qFileName stays undefined, qStartingLine = undefined, qEndingLine = undefined.
      //   isInternalFrame() always returns false (fileName === undefined is always false).
      //   filterStackString() keeps all lines including q.js internal frames.
      //   => q.js lines remain in the filtered stack.

      const lines = stack.split("\n");
      const qInternalLines = lines.filter((line: string) => /q\.js:\d+/.test(line));
      expect(qInternalLines.length).toBe(0);
    });

    return promise.fin(function () {
      Q.longStackSupport = false;
    });
  });
});