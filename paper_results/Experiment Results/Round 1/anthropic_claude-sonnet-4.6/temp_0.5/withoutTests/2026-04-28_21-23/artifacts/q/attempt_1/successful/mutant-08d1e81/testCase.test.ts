import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection process check", () => {
  it("should not call process.emit when process.emit is not a function", async () => {
    const originalEmit = process.emit;
    
    // Replace process.emit with a non-function to simulate environment without emit
    (process as any).emit = undefined;
    
    let errorThrown = false;
    try {
      // Create a rejected promise which triggers trackRejection
      const rejected = Q.reject(new Error("test rejection"));
      // Wait for async operations to complete
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (e) {
      errorThrown = true;
    } finally {
      process.emit = originalEmit;
    }
    
    expect(errorThrown).toBe(false);
  });
});