const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise post method", () => {
  it("should only call apply when method name is null or undefined", () => {
    const func = jest.fn().mockReturnValue("function result");
    const obj = {
      method: jest.fn().mockReturnValue("method result")
    };

    const funcPromise = Q(func);
    const objPromise = Q(obj);

    // Test 1: Function with null method name (should call apply)
    return funcPromise.post(null, []).then((result: unknown) => {
      expect(func).toHaveBeenCalled();
      expect(result).toBe("function result");

      // Test 2: Object with null method name (should not call apply)
      return objPromise.post(null, []).then((result: unknown) => {
        expect(obj.method).not.toHaveBeenCalled();
        expect(result).toBeUndefined();

        // Test 3: Object with actual method name (should call the method)
        return objPromise.post("method", []).then((result: unknown) => {
          expect(obj.method).toHaveBeenCalled();
          expect(result).toBe("method result");
        });
      });
    });
  });
});