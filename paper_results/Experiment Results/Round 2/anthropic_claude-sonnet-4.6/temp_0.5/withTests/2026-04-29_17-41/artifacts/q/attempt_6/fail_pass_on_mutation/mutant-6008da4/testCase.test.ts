import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("tracks and reports unhandled rejections correctly", () => {
    Q.resetUnhandledRejections();
    
    const error = new Error("test rejection");
    Q.reject(error);
    
    const reasons = Q.getUnhandledReasons();
    expect(reasons.length).toBe(1);
    expect(reasons[0]).toBe(error.stack);
    
    Q.resetUnhandledRejections();
  });
});