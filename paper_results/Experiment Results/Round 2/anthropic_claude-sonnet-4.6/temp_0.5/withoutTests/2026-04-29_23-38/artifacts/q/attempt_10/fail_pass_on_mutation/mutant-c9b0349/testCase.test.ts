import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("test", () => {
    Q.longStackSupport = true;
    const d = Q.defer();
    let err: any;
    
    const error = new Error("x");
    // Frame at line 99999: if qEndingLine < 99999, this would NOT be filtered by original
    // If qEndingLine >= 99999, this WOULD be filtered by original
    Object.defineProperty(error, "stack", {
      value: "Error: x\n    at f (x.js:99999:1)",
      writable: true,
      configurable: true,
    });
    
    const p = d.promise
      .then(() => { throw error; })
      .fail((e: any) => { err = e; })
      .then(() => {
        // If qEndingLine < 99999: f is NOT filtered by either version → "f" in stack
        // If qEndingLine >= 99999: f IS filtered by original → "f" NOT in stack
        // This test checks if qEndingLine is defined and what its value is
        expect(err.stack).toContain("f");
      });
    
    d.resolve();
    return p;
  });
});