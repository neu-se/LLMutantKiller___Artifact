import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation detection", () => {
  it("should preserve application stack frames and not only keep node internal frames", async () => {
    Q.longStackSupport = true;

    function outerFunction(): any {
      return Q.reject(new Error("test error from outerFunction"));
    }

    let capturedError: any = null;

    await outerFunction().then(null, function innerHandler(err: any) {
      capturedError = err;
      return null;
    });

    expect(capturedError).not.toBeNull();
    const stack: string = capturedError.stack || "";

    // In the original code, filterStackString keeps lines that are NOT node frames
    // (e.g., application frames like "at outerFunction (...:X:Y)")
    // In the mutated code, filterStackString only keeps lines that ARE node frames
    // (module.js or node.js), which in modern Node.js don't exist in user stacks
    // So the resulting stack would be empty or missing application frames

    // The stack should contain at least one frame referencing our test file
    // which is a non-node frame (not module.js or node.js)
    expect(stack).toMatch(/testCase\.test\.(ts|js)/);
  });
});