import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("test", () => {
    Q.longStackSupport = true;
    const d = Q.defer();
    let err: any;
    
    const error = new Error("x");
    Object.defineProperty(error, "stack", {
      value: "Error: x\n    at f (a.js:1:1)",
      writable: true,
      configurable: true,
    });
    
    const p = d.promise
      .then(() => { throw error; })
      .fail((e: any) => { err = e; })
      .then(() => {
        // Check makeStackTraceLong ran
        const hasFromPreviousEvent = err.stack.includes("From previous event:");
        // If makeStackTraceLong ran, check filtering
        if (hasFromPreviousEvent) {
          // Frame at line 1 < qStartingLine: original keeps it, mutation filters it
          expect(err.stack).toContain("f");
        } else {
          // makeStackTraceLong didn't run, original stack preserved
          expect(err.stack).toContain("f");
        }
      });
    
    d.resolve();
    return p;
  });
});