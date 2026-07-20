import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame", () => {
  it("error stack frames from user code survive filterStackString", async () => {
    Q.longStackSupport = true;

    // Create an error with a controlled stack
    // Use a line number that's clearly in a non-q file
    const err = new Error("controlled");
    // Override the stack to have a frame from a fake file at line 1
    // Original: preserved (fakeFile.js !== qFileName)  
    // Mutated: filtered (1 <= qEndingLine ~1089)
    Object.defineProperty(err, 'stack', {
      value: 'Error: controlled\n    at controlledFunc (fakeFile.js:1:1)',
      configurable: true,
      writable: true
    });

    let capturedError: any;
    const d = Q.defer();
    
    // Verify promise.stack is set
    const promise = d.promise as any;
    
    d.promise.then(function() { throw err; }).fail(function(e: any) {
      capturedError = e;
    });
    
    d.resolve(1);
    await new Promise(r => setTimeout(r, 50));

    // If promise.stack was set, makeStackTraceLong ran and modified error.stack
    if (promise.stack) {
      // makeStackTraceLong should have run
      // With original: controlledFunc frame preserved
      // With mutation: controlledFunc frame filtered (line 1 <= ~1089)
      expect(capturedError?.stack ?? "").toContain("controlledFunc");
    } else {
      // longStackSupport didn't work, test is inconclusive
      expect(promise.stack).toBeDefined();
    }
  });
});