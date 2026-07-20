import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame filtering in long stack traces", () => {
  it("filtered stack should not contain the stack jump separator with original isNodeFrame", () => {
    Q.longStackSupport = true;

    const d = Q.defer();
    const error = new Error("test");
    // Access error.stack to materialize it as an own configurable property
    // This ensures Object.defineProperty in makeStackTraceLong will work
    void error.stack;

    const p = d.promise.then(null, function(err: any) {
      Q.longStackSupport = false;
      const stack = err.stack || "";
      // "From previous event:" is the STACK_JUMP_SEPARATOR added by makeStackTraceLong
      // Original isNodeFrame: this line doesn't match "(module.js:" or "(node.js:" → filtered OUT
      // Mutated isNodeFrame (return true): this line is kept → appears in stack
      expect(stack.includes("From previous event:")).toBe(false);
    });

    d.reject(error);
    return p;
  });
});