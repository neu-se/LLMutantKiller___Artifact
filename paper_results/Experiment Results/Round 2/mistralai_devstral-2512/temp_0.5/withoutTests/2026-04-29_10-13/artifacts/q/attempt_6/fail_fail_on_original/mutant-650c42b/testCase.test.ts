const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.dispatch", () => {
  it("should return a promise when dispatching on a fulfilled promise", () => {
    const fulfilledPromise = Q.resolve({
      testMethod: function() {
        return "success";
      }
    });
    const result = Q.dispatch(fulfilledPromise, "testMethod", []);
    expect(result).toBeDefined();
    expect(typeof result.then).toBe("function");
    return result.then((value: unknown) => {
      expect(value).toBe("success");
    });
  });
});