import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("long stack traces should not include application-level frames after filtering", (done) => {
    Q.longStackSupport = true;

    const error = new Error("sentinel error");

    // With original isNodeFrame: only (module.js: or (node.js: lines pass
    // Application frames like "(testCase.test.ts:..." do NOT pass isNodeFrame
    // So filterStackString removes them -> the filtered stack has no test file references
    //
    // With mutant isNodeFrame (always true): all non-internal lines pass
    // So filterStackString keeps test file references -> stack contains "testCase.test.ts"

    Q.reject(error).fail((err: any) => {
      const stack: string = err.stack || "";
      // Original: test file frames are filtered out by isNodeFrame returning false
      // Mutant: test file frames are kept because isNodeFrame returns true
      expect(stack).not.toContain("testCase.test.ts");
      Q.longStackSupport = false;
      done();
    });
  });
});