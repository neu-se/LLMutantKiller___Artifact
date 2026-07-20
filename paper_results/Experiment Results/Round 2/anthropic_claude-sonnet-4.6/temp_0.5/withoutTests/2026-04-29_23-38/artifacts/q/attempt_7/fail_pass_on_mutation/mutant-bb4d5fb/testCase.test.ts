import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation", () => {
  it("detects mutation via filterStackString over-filtering", () => {
    // Access filterStackString indirectly by checking what makeStackTraceLong does
    // We need an error whose stack contains frames from a non-q file
    // and verify they survive filtering
    
    Q.longStackSupport = true;
    
    // Create an error with a known stack containing frames from this file
    const error = new Error("test");
    
    // Create a promise with a stack (simulating what defer() does)
    const deferred = Q.defer();
    
    // The promise should have a .stack property set
    const promise = deferred.promise as any;
    
    // Manually check if promise.stack exists
    expect(promise.stack).toBeDefined();
    
    // Now check that the stack contains frames from this file
    // With original: q.js frames filtered, this file's frames kept
    // With mutation: this file's frames also filtered (lineNumber <= ~1089)
    const stack: string = promise.stack ?? "";
    expect(stack).toContain("testCase");
  });
});