const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.ninvoke mutation test", () => {
  it("should pass arguments correctly to the invoked method", (done) => {
    const testObject = {
      method: function(arg1: string, arg2: string) {
        return arg1 + arg2;
      }
    };

    Q.ninvoke(testObject, "method", "hello", "world")
      .then((result: string) => {
        expect(result).toBe("helloworld");
        done();
      })
      .catch((error: Error) => {
        done(error);
      });
  });
});