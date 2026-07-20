import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking with array_indexOf", () => {
  it("should find and remove rejections from tracking array", async () => {
    Q.resetUnhandledRejections();
    
    const deferred = Q.defer();
    deferred.reject(new Error("tracked error"));
    
    let reasons = Q.getUnhandledReasons();
    expect(reasons.length).toBe(1);
    
    // Handle it - this calls untrackRejection which uses array_indexOf
    deferred.promise.catch(() => {});
    
    await new Promise(resolve => setTimeout(resolve, 50));
    
    reasons = Q.getUnhandledReasons();
    expect(reasons.length).toBe(0);
  });
});