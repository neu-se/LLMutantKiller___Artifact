const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise post method", () => {
  it("should handle null method name by not calling the method", () => {
    const obj = {
      method: jest.fn().mockReturnValue("called")
    };

    const promise = Q(obj);
    return promise.post(null, []).then((result: unknown) => {
      expect(obj.method).not.toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });
});