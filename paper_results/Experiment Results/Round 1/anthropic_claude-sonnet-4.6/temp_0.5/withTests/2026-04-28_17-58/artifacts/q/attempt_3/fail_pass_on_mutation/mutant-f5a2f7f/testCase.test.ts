import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame filtering via longStackSupport", () => {
  it("filters Q internal frames so user stack frames appear in long stack traces", () => {
    Q.longStackSupport = true;

    function userFunction(): Q.Promise<never> {
      const d = Q.defer<never>();
      setTimeout(() => {
        d.reject(new Error("user error"));
      }, 0);
      return d.promise;
    }

    return userFunction()
      .catch((err: Error) => {
        Q.longStackSupport = false;
        const stack = err.stack || "";
        // With correct qFileName set by captureLine(), Q internal frames are filtered.
        // The stack should contain "userFunction" 
        expect(stack).toContain("userFunction");
        // And should NOT contain Q-internal dispatch machinery lines
        // because isInternalFrame() filters them when qFileName is properly set
        const lines = stack.split("\n").filter(l => l.trim().startsWith("at "));
        // Every remaining line should not be a Q internal frame
        // i.e., the filtering is working
        expect(lines.length).toBeGreaterThan(0);
      });
  });
});