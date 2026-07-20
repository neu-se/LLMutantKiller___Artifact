import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf via unhandled rejection tracking", () => {
  it("should properly track and untrack rejections using array_indexOf", async () => {
    Q.resetUnhandledRejections();
    const err = new Error("test error");
    const rejected = Q.reject(err);
    
    expect(Q.getUnhandledReasons().length).toBe(1);
    
    // handling the rejection should untrack it via array_indexOf
    await rejected.fail(() => {});
    
    // Give time for untracking
    await new Promise(resolve => setTimeout(resolve, 50));
    
    expect(Q.getUnhandledReasons().length).toBe(0);
  });
});