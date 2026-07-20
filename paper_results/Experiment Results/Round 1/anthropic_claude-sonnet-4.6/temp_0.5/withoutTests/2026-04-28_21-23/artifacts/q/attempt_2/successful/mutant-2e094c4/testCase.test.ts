import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame", () => {
  it("filters node.js internal frames", async () => {
    Q.longStackSupport = true;

    // Create a chain of promises to build up a long stack trace
    const p1 = Q.reject(new Error("original error"));
    
    // p1.stack will be set by Q with the current call stack
    // In Node.js, this will contain internal frames
    
    let caughtError: any;
    await p1.then(null, (e: any) => { caughtError = e; });
    
    // Now manually inject a node frame into the promise stack and test again
    const deferred = Q.defer();
    
    // Wait for the deferred to be created (stack is set synchronously)
    const nodeFrame = "    at Module._compile (module.js:456:26)";
    
    // Append node frame to existing stack
    const existingStack = deferred.promise.stack || "";
    deferred.promise.stack = existingStack + "\n" + nodeFrame;
    
    const err2 = new Error("test");
    err2.stack = "Error: test\n    at myTest (test.js:5:3)";
    deferred.reject(err2);
    
    let caughtError2: any;
    await deferred.promise.then(null, (e: any) => { caughtError2 = e; });
    
    expect(caughtError2.stack).not.toContain("module.js:");
  });
});