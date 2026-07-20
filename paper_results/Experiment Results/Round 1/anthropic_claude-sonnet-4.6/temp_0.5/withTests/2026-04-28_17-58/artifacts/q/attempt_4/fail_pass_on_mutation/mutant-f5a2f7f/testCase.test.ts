import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack trace internal frame filtering", () => {
  it("should filter out Q internal frames from error stacks leaving only user frames", () => {
    Q.longStackSupport = true;

    function outer() {
      return Q.when(true).then(function inner() {
        throw new Error("test");
      });
    }

    return outer().catch((err: Error) => {
      Q.longStackSupport = false;
      const stack = err.stack || "";
      const lines = stack.split("\n");
      // Q internal frames (lines referencing q.js between qStartingLine and qEndingLine)
      // should be filtered out. If qFileName is properly set, lines from q.js
      // between the start and end lines are removed.
      // Check that "inner" user function appears
      expect(lines.some(l => l.includes("inner"))).toBe(true);
      // The number of lines referencing q.js internals should be zero
      // because isInternalFrame filters them when captureLine works correctly
      const qInternalLines = lines.filter(l => 
        l.includes("q.js") && 
        (l.includes("promiseDispatch") || l.includes("runSingle") || l.includes("flush"))
      );
      expect(qInternalLines.length).toBe(0);
    });
  });
});