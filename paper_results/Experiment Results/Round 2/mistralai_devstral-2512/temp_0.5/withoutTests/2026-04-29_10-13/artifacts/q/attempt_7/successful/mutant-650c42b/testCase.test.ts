const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.dispatch", () => {
  it("should dispatch a method call on a promise with post operation", () => {
    const testObject = Q({
      testMethod: function(arg1: string, arg2: number) {
        return arg1 + arg2;
      }
    });
    const result = Q.dispatch(testObject, "post", ["testMethod", ["hello", 5]]);
    return result.then((value: unknown) => {
      expect(value).toBe("hello5");
    });
  });
});