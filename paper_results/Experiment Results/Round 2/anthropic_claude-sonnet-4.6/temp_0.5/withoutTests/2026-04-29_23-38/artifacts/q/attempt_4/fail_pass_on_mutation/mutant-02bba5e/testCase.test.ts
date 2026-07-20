import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
  it("should not attempt to modify a null error object", async () => {
    Q.longStackSupport = false;

    // Track uncaught errors in nextTick
    const uncaughtErrors: any[] = [];
    const originalNextTick = process.nextTick;
    
    // We need to observe if TypeError is thrown inside nextTick callback
    // In the mutated code, object_defineProperty(null, ...) throws TypeError
    // This happens inside Q.nextTick which in Node uses process.nextTick
    // The error would be an uncaught exception
    
    const errorPromise = new Promise<any[]>((resolve) => {
      const errors: any[] = [];
      
      process.on('uncaughtException', function handler(err) {
        errors.push(err);
        process.removeListener('uncaughtException', handler);
        resolve(errors);
      });
      
      Q.reject(null).then(undefined, function() {
        // handled
      });
      
      setTimeout(() => resolve(errors), 200);
    });

    const errors = await errorPromise;
    
    // Original: no uncaught exception (null check prevents defineProperty on null)
    // Mutated: TypeError thrown when trying defineProperty on null
    expect(errors.length).toBe(0);
  });
});