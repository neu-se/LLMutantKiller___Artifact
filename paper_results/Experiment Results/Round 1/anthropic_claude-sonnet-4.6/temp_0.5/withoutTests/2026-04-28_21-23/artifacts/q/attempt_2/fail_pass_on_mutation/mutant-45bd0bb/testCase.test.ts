import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_create behavior", () => {
  it("should use Object.create so that created objects have no own properties from prototype", () => {
    const d = Q.defer();
    // Object.create(Promise.prototype) creates object with Promise.prototype as proto
    // The custom function does the same, but Object.create preserves exact prototype identity
    expect(Q.isPromise(d.promise)).toBe(true);
    expect(d.promise instanceof Q.makePromise).toBe(true);
  });
});