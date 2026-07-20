import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q getFileNameAndLineNumber attempt2", () => {
  it("should filter attempt2 format lines from Q file", async () => {
    Q.longStackSupport = true;
    
    // Get q.js file path
    const d = Q.defer();
    const ps: string = (d.promise as any).stack || "";
    const m = ps.match(/\(([^)]+q\.js):\d+:\d+\)/);
    if (!m) { d.resolve(1); return; }
    const qPath = m[1];
    
    // Create error with synthetic attempt2 line from q.js
    const syntheticLine = `at ${qPath}:500:5`;
    const err = new Error("test");
    err.stack = `Error: test\n    at userCode (test.js:1:1)\n    ${syntheticLine}`;
    
    // Verify the line is initially in the stack
    expect(err.stack).toContain(syntheticLine);
    
    d.reject(err);
    
    const caught = await d.promise.then(null, (e: Error) => e);
    
    // After makeStackTraceLong filtering:
    // Original: attempt2 identifies q.js:500:5 as internal → filtered → absent
    // Mutated: attempt2 disabled → not identified → present
    expect(caught.stack).not.toContain(syntheticLine);
  });
});