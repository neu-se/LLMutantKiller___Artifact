const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q Promise inspection", () => {
  it("should use default inspect when no custom inspect is provided", () => {
    const promise = Q.makePromise({});
    const inspection = promise.inspect();
    expect(inspection).toEqual({ state: "unknown" });
  });
});