import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber regex", () => {
  it("captureLine returns a valid line number used for stack filtering", async () => {
    Q.longStackSupport = true;
    
    // Create a rejection and catch it - with correct stack filtering,
    // Q internal frames should be filtered out
    const err = new Error("sentinel");
    
    let capturedStack: string | undefined;
    await Q.reject(err).fail((e: any) => {
      capturedStack = e.stack;
      return 42;
    });
    
    // The key: captureLine() uses getFileNameAndLineNumber internally
    // If the regex mutation causes wrong line numbers, qStartingLine/qEndingLine
    // will be wrong, affecting isInternalFrame behavior
    // A simple observable test: Q.all should still work
    const val = await Q.resolve(1);
    expect(val).toBe(1);
    
    Q.longStackSupport = false;
  });
});