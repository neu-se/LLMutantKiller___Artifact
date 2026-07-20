const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise post method", () => {
  it("should distinguish between null and non-null method names", () => {
    const obj = {
      method: jest.fn().mockReturnValue("method called")
    };

    const promise = Q(obj);

    // Test with null method name (should not call obj.method)
    return promise.post(null, []).then((result1: unknown) => {
      expect(obj.method).not.toHaveBeenCalled();
      expect(result1).toBeUndefined();

      // Test with actual method name (should call obj.method)
      return promise.post("method", []).then((result2: unknown) => {
        expect(obj.method).toHaveBeenCalled();
        expect(result2).toBe("method called");
      });
    });
  });
});