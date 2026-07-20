const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise post method", () => {
  it("should handle function objects differently than regular objects when method name is null", () => {
    const regularObj = {
      method: jest.fn().mockReturnValue("method called")
    };

    const functionObj = function() {
      return "function called";
    };
    functionObj.method = jest.fn().mockReturnValue("method called");

    const regularPromise = Q(regularObj);
    const functionPromise = Q(functionObj);

    // Test with regular object - should not call apply when name is null
    return regularPromise.post(null, []).then((result1: unknown) => {
      expect(regularObj.method).not.toHaveBeenCalled();
      expect(result1).toBeUndefined();

      // Test with function object - should call apply when name is null
      return functionPromise.post(null, []).then((result2: unknown) => {
        expect(result2).toBe("function called");
      });
    });
  });
});