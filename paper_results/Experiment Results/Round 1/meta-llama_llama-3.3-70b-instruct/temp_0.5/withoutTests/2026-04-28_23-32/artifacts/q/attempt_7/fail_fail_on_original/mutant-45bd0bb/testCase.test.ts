describe("Q", () => {
  it("should use Object.create when it is supported", () => {
    const Q = require("../../../../../../../../subject_repositories/q/q.js");
    const objectCreate = Object.create;
    Object.create = function(prototype) {
      return objectCreate(prototype);
    };
    const prototype = {};
    const object = Q(prototype);
    expect(object).not.toBeNull();
  });
});