import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promise resolver error message", () => {
  it("should throw a TypeError with message 'resolver must be a function.' when a non-function is passed", () => {
    expect(() => {
      Q.promise(null as any);
    }).toThrow(expect.objectContaining({
      message: "resolver must be a function."
    }));
  });
});