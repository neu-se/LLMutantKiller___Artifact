describe("Q", () => {
  it("should create an object", () => {
    const Q = require("../../../../../../../../subject_repositories/q/q.js");
    const object = Q({});
    expect(object).not.toBeNull();
  });
});