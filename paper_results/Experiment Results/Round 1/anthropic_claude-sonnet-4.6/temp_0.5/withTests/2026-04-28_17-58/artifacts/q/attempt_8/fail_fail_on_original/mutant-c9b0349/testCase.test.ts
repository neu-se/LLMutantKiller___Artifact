import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame lower bound", () => {
  it("detects mutation in isInternalFrame lower bound check", () => {
    Q.longStackSupport = true;
    const d = Q.defer();
    const fakeStack = "Error: test\n    at myFunc (somefile.js:1:1)\n    at otherFunc (somefile.js:9999:1)";
    const p = d.promise.then(null, (err: any) => {
      Q.longStackSupport = false;
      const stack = err.stack || "";
      // Line 1 frame: below qStartingLine → kept by original, filtered by mutated
      // Line 9999 frame: above qEndingLine → kept by both
      // If makeStackTraceLong ran:
      //   Original: both lines present
      //   Mutated: only line 9999 present
      // If makeStackTraceLong didn't run: both lines present (original fake stack)
      expect(stack).toContain("somefile.js:1");
      expect(stack).not.toContain("somefile.js:9999"); // This would fail if makeStackTraceLong didn't run
    });
    d.reject({ stack: fakeStack });
    return p;
  });
});