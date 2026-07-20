const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise post method", () => {
  it("should handle null method name by calling the object as a function", () => {
    const func = jest.fn().mockReturnValue("called");
    const promise = Q(func);

    return promise.post(null, []).then((result: unknown) => {
      expect(func).toHaveBeenCalled();
      expect(result).toBe("called");
    });
  });
});