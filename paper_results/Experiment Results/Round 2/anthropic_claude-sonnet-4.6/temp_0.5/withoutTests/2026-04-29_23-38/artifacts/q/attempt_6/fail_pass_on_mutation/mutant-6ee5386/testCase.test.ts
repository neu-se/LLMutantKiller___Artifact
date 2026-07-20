import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q done method error propagation", () => {
  it("should throw unhandled rejection errors to the event loop via done", async () => {
    // The threw variable tracks if an error was thrown in done's error handler
    // With threw=false (mutation), errors in done might be swallowed
    
    const error = new Error("unhandled");
    let uncaughtError: any = null;
    
    const originalOnerror = (Q as any).onerror;
    (Q as any).onerror = function(e: any) {
      uncaughtError = e;
    };
    
    Q.reject(error).done();
    
    // Wait for async processing
    await new Promise(resolve => setTimeout(resolve, 50));
    
    (Q as any).onerror = originalOnerror;
    
    expect(uncaughtError).toBe(error);
  });
});