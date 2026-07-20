import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise constructor inspect behavior", () => {
  it("should use default inspect when no custom inspect is provided", () => {
    const descriptor = {
      when: () => Q.resolve(42)
    };

    const promise = Q.makePromise(descriptor);
    const result = promise.inspect();

    expect(result).toEqual({ state: "unknown" });
  });
});