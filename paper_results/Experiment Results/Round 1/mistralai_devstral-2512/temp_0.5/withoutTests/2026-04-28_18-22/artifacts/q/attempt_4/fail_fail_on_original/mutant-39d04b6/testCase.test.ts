const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q Promise inspection", () => {
  it("should return an object with state property when inspecting a promise created with Promise constructor", () => {
    const promise = Q.Promise({
      "when": function () {
        return 42;
      }
    });
    const inspection = promise.inspect();
    expect(inspection).toHaveProperty("state");
    expect(inspection.state).toBe("unknown");
  });
});