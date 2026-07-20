import { Q } from "./q.js";

describe("Q.dispatch", () => {
  it("should dispatch a method call on an object", () => {
    const obj = {
      method: function(arg1: string, arg2: number) {
        return arg1 + arg2;
      }
    };
    const result = Q.dispatch(obj, "method", ["test", 42]);
    return result.then((value: unknown) => {
      expect(value).toBe("test42");
    });
  });
});