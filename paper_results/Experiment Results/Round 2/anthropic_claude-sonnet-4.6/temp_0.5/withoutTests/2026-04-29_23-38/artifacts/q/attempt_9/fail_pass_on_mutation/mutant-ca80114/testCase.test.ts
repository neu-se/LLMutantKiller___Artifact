import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejections", () => {
  it("should track unhandled rejections", (done) => {
    Q.resetUnhandledRejections();
    
    const reason = new Error("unhandled rejection");
    Q.reject(reason);
    
    setTimeout(() => {
      const reasons = Q.getUnhandledReasons();
      expect(reasons.length).toBe(1);
      Q.resetUnhandledRejections();
      done();
    }, 50);
  });
});