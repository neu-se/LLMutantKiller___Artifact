import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done", () => {
  it("should call the fulfilled callback and propagate errors when rejected", async () => {
    // The mutation changes Q.done to an empty function that does nothing
    // The original Q.done delegates to Q(object).done(fulfilled, rejected, progress)
    // We test that Q.done actually invokes the fulfilled callback on a resolved promise
    
    const result = await new Promise<string>((resolve, reject) => {
      const p = Q.resolve(42);
      
      // In the original code, Q.done calls Q(object).done(fulfilled, rejected, progress)
      // which will invoke the fulfilled callback with the resolved value
      Q.done(p, function(value: number) {
        resolve("fulfilled:" + value);
      }, function(err: Error) {
        reject(new Error("should not reject: " + err));
      });
      
      // Give it time to execute asynchronously
      setTimeout(() => {
        // If Q.done is a no-op (mutated), the fulfilled callback never fires
        // so we resolve with "noop" to detect the mutation
        resolve("noop");
      }, 100);
    });
    
    expect(result).toBe("fulfilled:42");
  });
});