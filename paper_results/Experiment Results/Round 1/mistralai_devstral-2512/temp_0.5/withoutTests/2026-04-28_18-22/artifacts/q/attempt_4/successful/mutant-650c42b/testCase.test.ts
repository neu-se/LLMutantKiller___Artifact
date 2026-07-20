const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.dispatch", () => {
  it("should dispatch a message to an object and return a promise", () => {
    const obj = { value: 42 };
    const result = Q.dispatch(obj, "get", ["value"]);
    return result.then((value: any) => {
      expect(value).toBe(42);
    });
  });
});