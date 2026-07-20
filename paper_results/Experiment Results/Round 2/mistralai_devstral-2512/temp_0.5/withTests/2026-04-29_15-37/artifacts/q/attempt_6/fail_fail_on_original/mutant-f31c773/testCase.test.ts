const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.set method", () => {
  it("should correctly pass key and value arguments to dispatch", () => {
    const obj: Record<string, any> = {};
    const key = "testKey";
    const value = "testValue";

    // Spy on the dispatch method to verify arguments
    const originalDispatch = obj.dispatch;
    obj.dispatch = jest.fn(function(op: string, args: any[]) {
      // Verify that the arguments contain both key and value
      expect(args).toEqual([key, value]);
      return originalDispatch ? originalDispatch.call(this, op, args) : Q.resolve();
    });

    return Q(obj)
      .set(key, value)
      .then(() => {
        expect(obj[key]).toBe(value);
        expect(obj.dispatch).toHaveBeenCalled();
      });
  });
});