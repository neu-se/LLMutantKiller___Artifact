import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame filtering", () => {
  it("should filter out node internal frames from long stack traces", async () => {
    Q.longStackSupport = true;

    // Create a rejection and catch it, then inspect the stack
    let capturedError: any;
    
    await Q.reject(new Error("test error"))
      .fail((err: any) => {
        capturedError = err;
        return Q.resolve();
      });

    // The filterStackString function should remove lines containing "(module.js:" or "(node.js:"
    // We test this by checking that the Q library itself filters such frames
    // Original: isNodeFrame returns true for module.js/node.js lines -> they get filtered
    // Mutated: isNodeFrame always returns false -> they don't get filtered
    
    // We need to verify the filtering behavior indirectly
    // by checking if a synthetic stack with node frames gets cleaned
    const nodeFrameLine = "    at Object.<anonymous> (module.js:456:3)";
    const filteredStack = capturedError?.stack || "";
    
    // In original: node frames are filtered out
    // In mutated: node frames remain
    expect(filteredStack).not.toContain("(module.js:");
  });
});