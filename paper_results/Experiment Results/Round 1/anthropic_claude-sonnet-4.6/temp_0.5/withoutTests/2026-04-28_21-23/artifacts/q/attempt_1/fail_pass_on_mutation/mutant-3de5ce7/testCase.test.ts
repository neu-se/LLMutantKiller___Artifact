import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise rejection with long stack support", () => {
  it("should correctly resolve a rejected promise with proper error handling", async () => {
    Q.longStackSupport = true;
    
    const error = new Error("test error");
    const rejected = Q.reject(error);
    
    let caughtReason: any;
    await rejected.then(null, (reason: any) => {
      caughtReason = reason;
    });
    
    expect(caughtReason).toBe(error);
    expect(caughtReason.message).toBe("test error");
    
    Q.longStackSupport = false;
  });
});