// Test case to detect the mutation in the ninvoke method
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.ninvoke", () => {
  it("should invoke a method with arguments and return a promise for the result", (done) => {
    const obj = {
      method: function(arg1: number, arg2: number) {
        return arg1 + arg2;
      }
    };

    Q.ninvoke(obj, "method", 2, 3)
      .then((result: number) => {
        expect(result).toBe(5);
        done();
      })
      .catch((error: any) => {
        done(error);
      });
  });
});