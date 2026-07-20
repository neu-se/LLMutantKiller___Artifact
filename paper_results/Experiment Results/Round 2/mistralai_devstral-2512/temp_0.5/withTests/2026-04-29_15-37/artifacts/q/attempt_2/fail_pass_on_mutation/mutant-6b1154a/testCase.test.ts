import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done method behavior", () => {
  it("should return undefined when called without callbacks", () => {
    const result = Q().done();
    expect(result).toBeUndefined();
  });
});