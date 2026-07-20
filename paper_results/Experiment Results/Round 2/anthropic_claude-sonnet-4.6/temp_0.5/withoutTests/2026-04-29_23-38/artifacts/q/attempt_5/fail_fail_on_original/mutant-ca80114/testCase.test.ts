import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick error handling", () => {
  it("should continue processing tasks after one throws", (done) => {
    const results: string[] = [];
    
    Q.nextTick(function() {
      throw new Error("intentional error");
    });
    
    Q.nextTick(function() {
      results.push("second task ran");
    });
    
    setTimeout(() => {
      expect(results).toContain("second task ran");
      done();
    }, 100);
  });
});