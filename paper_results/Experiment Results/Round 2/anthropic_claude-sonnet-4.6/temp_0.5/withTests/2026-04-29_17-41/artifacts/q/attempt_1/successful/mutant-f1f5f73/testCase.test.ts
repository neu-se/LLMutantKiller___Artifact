import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.tap static method", () => {
  it("should call the callback and resolve with the original value when using Q.tap", () => {
    const callbackValues: unknown[] = [];
    
    return Q.tap(Q("foo"), function (value: unknown) {
      callbackValues.push(value);
      return "bar";
    }).then(function (result: unknown) {
      expect(callbackValues).toEqual(["foo"]);
      expect(result).toBe("foo");
    });
  });
});