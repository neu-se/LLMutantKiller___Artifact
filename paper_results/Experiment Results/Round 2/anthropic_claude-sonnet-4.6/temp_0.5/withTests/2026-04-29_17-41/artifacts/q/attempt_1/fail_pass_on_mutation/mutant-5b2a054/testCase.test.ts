import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("error handling in async queue", () => {
  it("should propagate errors thrown in promise handlers through Q.onerror", (done) => {
    const thrownError = new Error("test error in handler");
    const errors: Error[] = [];

    Q.onerror = function(err: Error) {
      errors.push(err);
    };

    Q(42)
      .then(function() {
        throw thrownError;
      })
      .done();

    setTimeout(function() {
      Q.onerror = null;
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0]).toBe(thrownError);
      done();
    }, 100);
  });
});