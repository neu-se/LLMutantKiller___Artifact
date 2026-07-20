import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise inspection", () => {
  it("should return the correct state for a promise created with Promise constructor", async () => {
    const promise = new Q.Promise({
      "when": function () {
        return "value";
      }
    }, function fallback() {
      return this;
    });

    const inspection = promise.inspect();
    expect(inspection).toEqual({ state: "unknown" });
  });
});