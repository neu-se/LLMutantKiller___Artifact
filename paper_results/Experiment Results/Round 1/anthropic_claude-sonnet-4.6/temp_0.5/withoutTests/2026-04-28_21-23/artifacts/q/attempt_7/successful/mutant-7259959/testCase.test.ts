import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async ES6 generator return value", () => {
  it("resolves with final return value from generator", (done) => {
    const asyncFn = Q.async(function* () {
      const x = yield Q.resolve(10);
      return x + 32;
    });
    
    asyncFn().then(
      (val: any) => {
        try { expect(val).toBe(42); done(); } catch(e) { done(e); }
      },
      (err: any) => {
        done(new Error("Rejected: " + err));
      }
    );
  });
});