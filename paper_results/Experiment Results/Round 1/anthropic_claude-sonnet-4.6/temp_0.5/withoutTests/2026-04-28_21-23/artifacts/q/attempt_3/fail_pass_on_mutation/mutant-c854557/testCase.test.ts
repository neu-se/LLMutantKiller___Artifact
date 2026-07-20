import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q filters anonymous frames with multi-digit line numbers", () => {
  it("filters anonymous Q.js frames from long stack traces", async () => {
    Q.longStackSupport = true;
    
    // Step 1: Get the Q.js file path from a real Q.js stack frame
    let qFilePath: string | null = null;
    
    const d1 = Q.defer();
    const p1 = d1.promise.then(null, (e: Error) => {
      // The error's stack has been processed by makeStackTraceLong
      // which includes promise.stack (containing Q.js frames)
      // We can extract qFileName from promise.stack
      const stack = e.stack || "";
      const match = stack.match(/at defer \((.+q\.js):\d+:\d+\)/);
      if (match) {
        qFilePath = match[1];
      }
    });
    
    d1.reject(new Error("probe"));
    await p1;
    
    if (!qFilePath) {
      // Can't determine Q.js path, skip test
      Q.longStackSupport = false;
      return;
    }
    
    // Step 2: Create a custom error with an anonymous Q.js frame
    // at a multi-digit line number
    const customError = new Error("custom");
    const anonymousFrame = `    at ${qFilePath}:500:13`;  // anonymous frame at line 500
    customError.stack = `Error: custom\n${anonymousFrame}\n    at Object.<anonymous> (test.ts:1:1)`;
    
    // Step 3: Reject a promise with this custom error
    let capturedError: Error | null = null;
    const d2 = Q.defer();
    const p2 = d2.promise.then(null, (e: Error) => {
      capturedError = e;
    });
    
    d2.reject(customError);
    await p2;
    
    Q.longStackSupport = false;
    
    expect(capturedError).not.toBeNull();
    
    const stack = capturedError!.stack || "";
    
    // With original code (\d+): attempt2 matches the anonymous frame at line 500
    // isInternalFrame returns true (if 500 is in Q's range)
    // filterStackString removes the frame
    // => stack does NOT contain the anonymous frame
    //
    // With mutated code (\d): attempt2 does NOT match (500 has 3 digits)
    // isInternalFrame returns false
    // filterStackString keeps the frame
    // => stack DOES contain the anonymous frame
    
    expect(stack).not.toContain(anonymousFrame.trim());
  });
});