import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation detection", () => {
  it("should correctly track and untrack rejections so getUnhandledReasons is empty after handling", async () => {
    Q.resetUnhandledRejections();
    
    const rejection = Q.reject(new Error("test error"));
    
    await rejection.fail(function() { return null; });
    
    await Q.delay(50);
    
    expect(Q.getUnhandledReasons().length).toBe(0);
  });
});