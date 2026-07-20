import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame filtering", () => {
  it("should exclude node.js internal frames from filtered stack traces", async () => {
    Q.longStackSupport = true;

    // Create a deferred whose promise has a stack containing a node internal frame
    const deferred = Q.defer();
    // Inject a fake stack that includes a node internal frame
    (deferred.promise as any).stack = "    at Object.<anonymous> (module.js:456:3)\n    at realCode (app.js:10:5)";

    const error = new Error("test rejection");
    error.stack = "Error: test\n    at myFunc (myfile.js:5:10)";

    deferred.reject(error);

    let capturedError: any;
    await deferred.promise.fail((e: any) => {
      capturedError = e;
      return Q.resolve();
    });

    // Original: isNodeFrame filters out "(module.js:" lines -> stack won't contain it
    // Mutated: isNodeFrame returns false -> "(module.js:" lines remain in stack
    expect(capturedError.stack).not.toContain("(module.js:");
  });
});