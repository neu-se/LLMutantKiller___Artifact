import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q getFileNameAndLineNumber attempt2", () => {
  it("should filter Q internal frames from long stack traces", async () => {
    Q.longStackSupport = true;
    
    // Create a promise chain to generate long stack traces
    const deferred = Q.defer();
    
    const p = deferred.promise.then(function step1(v: number) {
      return v + 1;
    }).then(function step2(v: number) {
      throw new Error("intentional error");
    });
    
    deferred.resolve(1);
    
    const err = await p.then(null, (e: Error) => e);
    const stack = err.stack || "";
    
    // Q internal frames like "promiseDispatch", "runSingle", "flush" should be filtered
    // In original: these are filtered because isInternalFrame works correctly
    // In mutated: if attempt2 is needed for some Q frames, they won't be filtered
    expect(stack).not.toMatch(/promiseDispatch/);
    expect(stack).not.toMatch(/runSingle/);
  });
});