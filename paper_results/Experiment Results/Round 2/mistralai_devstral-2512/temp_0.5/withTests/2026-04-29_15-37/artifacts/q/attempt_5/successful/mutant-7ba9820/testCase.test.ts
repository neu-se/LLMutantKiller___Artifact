// Test case to detect the mutation in the ninvoke method
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.ninvoke", () => {
  it("should properly handle ninvoke on a promise-wrapped object", () => {
    const obj = {
      method: function(arg1: number, arg2: number, callback: Function) {
        callback(null, arg1 + arg2);
      }
    };

    return Q(obj).ninvoke("method", 2, 3).then((result: number) => {
      expect(result).toBe(5);
    });
  });
});