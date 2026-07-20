import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.makePromise / Promise constructor", () => {
  it("a fulfilled promise created via Q.makePromise should not have exception set", () => {
    const fulfilledValue = "hello";
    const p = Q.makePromise(
      {
        when: function() { return fulfilledValue; }
      },
      undefined,
      function inspect() { return { state: "fulfilled", value: fulfilledValue }; }
    );
    expect((p as any).exception).toBeUndefined();
  });
});