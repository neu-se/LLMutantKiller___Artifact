import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q rejection with null", () => {
  it("makeStackTraceLong does not access .stack on null error", async () => {
    Q.longStackSupport = false;
    
    // Track if null.stack was accessed (would throw TypeError)
    let stackAccessedOnNull = false;
    
    // We can't proxy null, but we can observe the TypeError
    // by checking if the rejection handler completes normally
    
    const errors: Error[] = [];
    const originalHandler = process.listeners("uncaughtException").slice();
    
    await new Promise<void>((resolve, reject) => {
      const uncaughtHandler = (err: Error) => {
        errors.push(err);
        // Don't resolve/reject here - let the test continue
      };
      
      process.on("uncaughtException", uncaughtHandler);
      
      let handlerCalled = false;
      
      Q.reject(null).then(undefined, (err: any) => {
        handlerCalled = true;
      }).then(() => {
        process.removeListener("uncaughtException", uncaughtHandler);
        if (errors.some(e => e instanceof TypeError)) {
          reject(new Error("TypeError was thrown: " + errors[0]));
        } else {
          resolve();
        }
      });
      
      setTimeout(() => {
        process.removeListener("uncaughtException", uncaughtHandler);
        if (!handlerCalled) {
          reject(new Error("Handler never called. Errors: " + errors.map(e => e.message).join(", ")));
        } else {
          resolve();
        }
      }, 500);
    });
  });
});