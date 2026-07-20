import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame lower bound", () => {
  it("detects mutation with controlled stack format", () => {
    const originalPrepareStackTrace = (Error as any).prepareStackTrace;
    
    // Set a custom prepareStackTrace that returns predictable stacks
    (Error as any).prepareStackTrace = (err: Error, frames: any[]) => {
      return err.message + "\n" + frames.map((f: any) => 
        `    at ${f.getFunctionName() || 'anonymous'} (controlled.js:${f.getLineNumber()}:1)`
      ).join("\n");
    };
    
    Q.longStackSupport = true;
    const d = Q.defer();
    const p = d.promise.then(null, (err: any) => {
      Q.longStackSupport = false;
      (Error as any).prepareStackTrace = originalPrepareStackTrace;
      const stack = err.stack || "";
      expect(stack).toContain("controlled.js:1");
    });
    
    // Create error with controlled stack
    const e = new Error("test");
    d.reject(e);
    return p;
  });
});