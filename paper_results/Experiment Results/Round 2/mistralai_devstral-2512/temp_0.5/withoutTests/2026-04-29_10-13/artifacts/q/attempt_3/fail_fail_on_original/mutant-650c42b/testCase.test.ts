const Q = require("./q.js");

describe("Q.dispatch", () => {
  it("should dispatch a method call on an object and return a promise", () => {
    const testObject = {
      testMethod: function(arg1: string, arg2: number) {
        return arg1 + arg2;
      }
    };
    const result = Q.dispatch(testObject, "testMethod", ["hello", 5]);
    return result.then((value: unknown) => {
      expect(value).toBe("hello5");
    });
  });
});