import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q rejection tracking with array_indexOf", () => {
  it("should complete unhandledRejection tracking without infinite loop", async () => {
    jest.setTimeout(5000);
    
    Q.resetUnhandledRejections();
    
    // Create multiple rejections to populate unhandledRejections array
    const p1 = Q.reject(new Error("err1"));
    const p2 = Q.reject(new Error("err2"));
    const p3 = Q.reject(new Error("err3"));
    
    // Handle them all - each triggers untrackRejection -> array_indexOf
    // on an array with multiple elements
    await Promise.all([
      p1.catch(() => {}),
      p2.catch(() => {}),
      p3.catch(() => {}),
    ]);
    
    // If we reach here, no infinite loop occurred
    const reasons = Q.getUnhandledReasons();
    expect(reasons.length).toBe(0);
  });
});