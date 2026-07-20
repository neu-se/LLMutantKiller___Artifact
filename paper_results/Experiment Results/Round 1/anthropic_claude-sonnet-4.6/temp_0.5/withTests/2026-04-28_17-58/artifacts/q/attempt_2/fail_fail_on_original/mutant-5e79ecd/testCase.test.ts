import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done", () => {
  it("should untrack the rejection after one tick when called with no callbacks", (done) => {
    Q.resetUnhandledRejections();
    
    const reason = new Error("test rejection");
    Q.reject(reason).done();
    
    // Schedule check after the first dispatch tick
    Q.nextTick(function() {
      // With original: rejection is untracked after 1 tick (count = 0)
      // With mutated: a new rejection is created and tracked (count = 1)
      const count = Q.getUnhandledReasons().length;
      expect(count).toBe(0);
      done();
    });
  });
});