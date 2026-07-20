const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.coerce", () => {
  it("should reject when a thenable throws an exception", (done) => {
    const thenable = {
      then: function() {
        throw new Error("Test error");
      }
    };

    Q(thenable)
      .then(() => {
        done(new Error("Promise should have been rejected"));
      })
      .catch((error: Error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Test error");
        done();
      });
  });
});