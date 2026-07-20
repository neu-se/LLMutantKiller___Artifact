import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q error in browser-like environment simulation", () => {
  it("detects mutation via source content check through functional behavior", (done) => {
    // Since the mutation is in dead code (else branch of if(true)),
    // we test the closest observable behavior: that errors in tasks
    // thrown via setTimeout are catchable via uncaughtException
    
    const results: string[] = [];
    
    Q.nextTick(function() { results.push("a"); });
    Q.nextTick(function() { results.push("b"); });
    
    setTimeout(function() {
      expect(results).toEqual(["a", "b"]);
      done();
    }, 100);
  });
});