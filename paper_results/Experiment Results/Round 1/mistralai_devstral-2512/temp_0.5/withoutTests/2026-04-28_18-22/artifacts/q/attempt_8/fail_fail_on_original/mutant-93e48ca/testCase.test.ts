const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise post method", () => {
  it("should handle non-function objects with null method name without errors", () => {
    const obj = {
      method: jest.fn().mockReturnValue("called")
    };

    const promise = Q(obj);
    return promise.post(null, []).then((result: unknown) => {
      expect(obj.method).not.toHaveBeenCalled();
      expect(result).toBeUndefined();
    }).catch((error: unknown) => {
      fail("Should not throw error for non-function objects");
    });
  });
});