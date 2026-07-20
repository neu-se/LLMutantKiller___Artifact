describe("Q", () => {
  it("should throw an error when Object.create is not a function", () => {
    const Q = require("../../../../../../../../subject_repositories/q/q.js");
    Object.create = null;
    expect(() => {
      const prototype = {};
      Q(prototype);
    }).toThrowError();
  });
});