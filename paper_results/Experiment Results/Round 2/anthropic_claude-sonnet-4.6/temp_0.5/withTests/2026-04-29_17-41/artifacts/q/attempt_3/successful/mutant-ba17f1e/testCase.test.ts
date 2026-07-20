import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
  it("correctly parses named function stack frames for internal frame detection", () => {
    Q.longStackSupport = true;

    // Create a chain that will have Q's internal frames in the promise stack
    function step1() {
      return Q.when(42);
    }

    function step2() {
      return step1().then(function() {
        throw new Error("caught error");
      });
    }

    return step2().then(
      function() { Q.longStackSupport = false; throw new Error("should have rejected"); },
      function(err: any) {
        Q.longStackSupport = false;
        const stack: string = err.stack || "";
        
        // The stack should contain "From previous event:" separator
        // (added by makeStackTraceLong when longStackSupport is true)
        // AND should have "step2" in it
        // AND should NOT have Q internal frames (with original code)
        
        // Most importantly: with original code, the stack is filtered
        // and Q's own frames from q.js are removed.
        // With mutation, they are not removed.
        
        // Let's check the "From previous event" section doesn't have q.js frames
        if (stack.includes("From previous event:")) {
          const afterSeparator = stack.split("From previous event:")[1] || "";
          const hasQFrames = afterSeparator.split('\n').some(
            line => line.match(/\s+at\s+/) && line.includes('q.js')
          );
          expect(hasQFrames).toBe(false);
        }
      }
    );
  });
});