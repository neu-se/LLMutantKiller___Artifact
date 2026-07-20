import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q isInternalFrame", () => {
  it("filters only Q frames not user frames in long stack traces", async () => {
    Q.longStackSupport = true;

    // Create a deferred - this gives the promise a .stack property
    const d = Q.defer();
    
    // The deferred promise has .stack set inside defer()
    // When we reject and handle it, makeStackTraceLong will be called
    // with this promise (which has .stack), so filtering will happen
    
    function rejectingFunction() {
      d.reject(new Error("test"));
    }
    rejectingFunction();

    let processedError: any;
    // Use .then on the deferred promise itself (which has .stack)
    await new Promise<void>((resolve) => {
      d.promise.then(null, (e: any) => {
        processedError = e;
        resolve();
      });
    });

    // With original: "rejectingFunction" frame preserved (not from q.js)
    // With mutation: "rejectingFunction" frame filtered (lineNumber <= qEndingLine ~1800)
    expect(processedError.stack).toContain("rejectingFunction");
  });
});