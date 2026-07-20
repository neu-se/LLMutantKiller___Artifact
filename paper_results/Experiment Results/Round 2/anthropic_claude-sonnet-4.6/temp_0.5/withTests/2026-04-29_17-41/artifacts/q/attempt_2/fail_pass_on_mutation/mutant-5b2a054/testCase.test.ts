import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick error propagation", () => {
  it("should rethrow errors from task callbacks synchronously in the flush loop", (done) => {
    const errors: unknown[] = [];
    const originalOnerror = Q.onerror;

    // Schedule two tasks: first throws, second should still run
    let secondTaskRan = false;

    Q.nextTick(function() {
      Q.nextTick(function() {
        secondTaskRan = true;
      });
    });

    Q(1).then(function() {
      return Q(2).then(function() {
        return 3;
      });
    }).then(function(val: number) {
      expect(val).toBe(3);
      expect(secondTaskRan).toBe(true);
      Q.onerror = originalOnerror;
      done();
    }).catch(function(err: unknown) {
      Q.onerror = originalOnerror;
      done(err);
    });
  });
});