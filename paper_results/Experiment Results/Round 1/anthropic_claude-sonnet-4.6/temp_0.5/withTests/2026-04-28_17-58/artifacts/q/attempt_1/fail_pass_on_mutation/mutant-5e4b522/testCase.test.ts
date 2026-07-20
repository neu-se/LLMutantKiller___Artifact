import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module loading", () => {
  it("should export a working Q function that creates fulfilled promises", () => {
    expect(typeof Q).toBe("function");
    const promise = Q(42);
    expect(Q.isPromise(promise)).toBe(true);
    expect(promise.inspect()).toEqual({ state: "fulfilled", value: 42 });
  });
});