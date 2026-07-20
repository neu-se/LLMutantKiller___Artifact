const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.finally mutation test", () => {
  it("should handle valid callback function correctly", () => {
    const promise = Q.resolve(42);
    const callback = jest.fn();

    // This should work fine with a valid function
    return promise.finally(callback).then(() => {
      expect(callback).toHaveBeenCalled();
    });
  });
});