import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q noConflict behavior in Node.js environment", () => {
  it("should throw an error when noConflict is called in Node.js", () => {
    expect(() => {
      Q.noConflict();
    }).toThrow("Q.noConflict only works when Q is used as a global");
  });
});