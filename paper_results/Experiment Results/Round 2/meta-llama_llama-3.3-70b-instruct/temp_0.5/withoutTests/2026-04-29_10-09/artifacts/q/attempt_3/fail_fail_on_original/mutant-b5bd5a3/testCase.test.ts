import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should set the valueOf property when a promise is fulfilled", () => {
    const promise = q.Q(42);
    const valueOf = promise.valueOf();
    expect(valueOf).toBe(42);
  });
});