import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("test", () => {
    Q.longStackSupport = true;
    const d = Q.defer();
    let err: any;
    
    const error = new Error("x");
    // Frame at line 500: in [qStartingLine, qEndingLine] - filtered by both
    // Frame at line 1: below qStartingLine - NOT filtered by original, filtered by mutation
    Object.defineProperty(error, "stack", {
      value: "Error: x\n    at inRange (x.js:500:1)\n    at belowRange (x.js:1:1)",
      writable: true,
      configurable: true,
    });
    
    const p = d.promise
      .then(() => { throw error; })
      .fail((e: any) => { err = e; })
      .then(() => {
        // inRange filtered by both → not in stack (proves makeStackTraceLong ran)
        expect(err.stack).not.toContain("inRange");
        // belowRange: original keeps it, mutation filters it
        expect(err.stack).toContain("belowRange");
      });
    
    d.resolve();
    return p;
  });
});