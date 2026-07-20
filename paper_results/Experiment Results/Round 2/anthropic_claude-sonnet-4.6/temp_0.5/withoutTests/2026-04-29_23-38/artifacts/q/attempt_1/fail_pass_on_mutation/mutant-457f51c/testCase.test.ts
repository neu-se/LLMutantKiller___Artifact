import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise valueOf behavior", () => {
  it("should not set exception property on fulfilled promises due to dead code block", async () => {
    const fulfilled = Q(42);
    const rejected = Q.reject(new Error("test error"));
    
    // The dead code block (if false) means exception should never be set
    expect((fulfilled as any).exception).toBeUndefined();
    
    // Clean up unhandled rejection
    rejected.catch(() => {});
    
    await new Promise(resolve => setTimeout(resolve, 10));
  });
});