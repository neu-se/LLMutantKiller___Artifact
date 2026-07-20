const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q Promise inspection", () => {
  it("should return an object with state property when inspecting a promise created with Promise constructor", () => {
    const promise = Q.Promise(function(resolve: any) {
      // Don't resolve or reject - leave it pending
    });
    const inspection = promise.inspect();
    expect(inspection).toHaveProperty("state");
    expect(inspection.state).toBe("unknown");
  });
});