import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("should not include non-node-module frames in filtered stack traces", async () => {
    Q.longStackSupport = true;

    const p = Q.reject(new Error("test rejection"));

    let caughtStack: string = "";
    await p.then(null, (err: Error) => {
      caughtStack = err.stack || "";
    });

    // With original code: only lines matching "(module.js:" or "(node.js:" are kept
    // Test environment stack frames (e.g., "testCase.test.ts:...") do NOT match those patterns
    // So filtered stack should NOT contain test file references
    // With mutated code: all non-internal frames are kept, including test file references
    expect(caughtStack).not.toContain("testCase.test.ts");
  });
});