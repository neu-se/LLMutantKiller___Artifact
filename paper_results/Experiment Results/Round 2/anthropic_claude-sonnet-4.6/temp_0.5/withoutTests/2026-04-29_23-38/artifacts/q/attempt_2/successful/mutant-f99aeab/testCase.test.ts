import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine", () => {
  it("should filter Q internal frames from long stack traces when stacks are available", () => {
    Q.longStackSupport = true;
    
    const d = Q.defer();
    d.reject(new Error("test error"));
    
    return d.promise.fail((err: any) => {
      const stack: string = err.stack;
      // With original code: qFileName is set, Q internal frames filtered out
      // With mutated code: qFileName is undefined, Q internal frames remain in stack
      // Check that the stack doesn't contain Q's internal implementation frames
      // by verifying q.js lines don't appear between user code lines
      const lines = stack.split("\n").filter((line: string) => line.includes("q.js"));
      expect(lines.length).toBe(0);
    });
  });
});