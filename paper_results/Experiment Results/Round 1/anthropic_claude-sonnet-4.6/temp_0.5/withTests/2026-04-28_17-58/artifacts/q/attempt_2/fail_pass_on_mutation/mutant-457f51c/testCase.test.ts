import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise exception property", () => {
  it("should not set exception property on a fulfilled promise", () => {
    const fulfilledPromise = Q(42);
    // On original code: exception is only set when state === "rejected"
    // On mutated code: exception is set unconditionally (if (true))
    // so a fulfilled promise would incorrectly have exception set to undefined
    expect((fulfilledPromise as any).exception).toBeUndefined();
  });
});