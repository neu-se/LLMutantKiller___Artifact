import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
  it("should throw an error when wrapping an undefined function", () => {
    expect(() => {
      Q.denodeify(undefined);
    }).toThrow("Q can't wrap an undefined function");
  });
});