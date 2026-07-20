import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done behavior", () => {
  it("should handle fulfilled promise with no callbacks", () => {
    const promise = Q.resolve(42);
    const result = promise.done();
    expect(result).toBeUndefined();
  });
});