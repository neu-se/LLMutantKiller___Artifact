import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q isInternalFrame qStartingLine boundary", () => {
  it("treats the qStartingLine as an internal frame (>= not >)", async () => {
    Q.longStackSupport = true;

    // Capture the stack at the point where a deferred is created
    // The promise.stack will include frames from Q's own code
    // makeStackTraceLong will call filterStackString on the concatenated stacks
    // filterStackString uses isInternalFrame which checks lineNumber >= qStartingLine
    
    let filteredStack = "";

    // We need to create a scenario where the stack captured in promise.stack
    // includes a frame at exactly qStartingLine.
    // qStartingLine is the line of "var qStartingLine = captureLine();"
    // 
    // The key: when defer() is called inside Q.when/Q.then, the captured stack
    // includes the line where defer() itself was called from within Q's code.
    // If any of those call sites happen to be at qStartingLine, the mutation matters.
    //
    // More directly: we can test by checking that the number of q.js frames
    // in the filtered stack is consistent with >= filtering.

    const deferred = Q.defer();
    
    const p = deferred.promise.then(null, (err: Error) => {
      filteredStack = err.stack || "";
    });

    deferred.reject(new Error("mutation test"));
    await p;

    expect(filteredStack).toContain("mutation test");

    // Count q.js frames in the filtered stack
    // With >= (original): frames at qStartingLine ARE filtered
    // With > (mutation): frames at qStartingLine are NOT filtered (one extra frame)
    const qFrameCount = (filteredStack.match(/q\.js/g) || []).length;
    
    // With proper filtering, there should be 0 q.js frames in the output
    // (all Q internal frames are removed)
    expect(qFrameCount).toBe(0);
  });
});