import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done", () => {
  it("should throw an error when called without arguments", () => {
    expect(() => {
      Q.done();
    }).toThrow();
  });
});