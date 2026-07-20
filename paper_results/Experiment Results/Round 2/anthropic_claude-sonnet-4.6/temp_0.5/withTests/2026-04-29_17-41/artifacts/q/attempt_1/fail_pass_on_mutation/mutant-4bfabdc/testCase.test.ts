import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString via long stack traces", () => {
  it("should not include Q internal frames in long stack trace error stacks", (done) => {
    Q.longStackSupport = true;

    function level1() {
      return Q.Promise(function (resolve, reject) {
        setTimeout(function () {
          reject(new Error("test error"));
        }, 0);
      });
    }

    level1().then(function () {
      Q.longStackSupport = false;
      done(new Error("Should have rejected"));
    }).catch(function (err: any) {
      Q.longStackSupport = false;
      // The stack should not contain Q's internal implementation lines
      // In the original, internal frames are filtered out
      // In the mutated version, internal frames may appear in the stack
      const stack: string = err.stack || "";
      
      // The stack should contain our test function reference
      // but should NOT contain Q's internal q.js boilerplate lines
      // like "promise.promiseDispatch" or internal Q machinery
      // We check that the stack does not contain lines that are purely
      // Q-internal (which filterStackString should remove)
      
      // A reliable way: the filtered stack should not have empty lines
      // caused by the mutation including empty/falsy lines
      // Original: requires line to be truthy (&&line)
      // Mutated: may include falsy/empty lines
      const lines = stack.split("\n").filter((l: string) => l === "");
      
      // With the original code, empty lines are excluded (&&line check)
      // With the mutated code, empty lines from internal frames may slip through
      // Actually let's test a more direct observable: the stack length behavior
      
      // Better approach: check that the stack doesn't have excessive Q internal frames
      // The mutation causes isInternalFrame lines to be included when they shouldn't be
      // This means the stack will be longer with internal Q frames
      
      // Count lines that reference q.js internal machinery
      const qInternalLines = stack.split("\n").filter((line: string) => {
        return line.includes("promiseDispatch") || 
               line.includes("runSingle") ||
               line.includes("flush");
      });
      
      // In original: internal frames are filtered, so no q.js internal lines
      // In mutated: internal frames pass through, so q.js internal lines appear
      expect(qInternalLines.length).toBe(0);
      done();
    });
  });
});