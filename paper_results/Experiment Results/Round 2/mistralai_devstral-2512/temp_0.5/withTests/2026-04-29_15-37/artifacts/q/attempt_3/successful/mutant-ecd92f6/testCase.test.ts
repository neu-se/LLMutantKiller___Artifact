import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise inspection", () => {
  it("should return 'unknown' state for promises created without an inspect function", () => {
    const promise = Q.makePromise({});
    const inspection = promise.inspect();
    expect(inspection.state).toBe("unknown");
  });
});