import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.makePromise inspect", () => {
  it("a custom promise with unknown state inspect returns unknown state", () => {
    const p = Q.makePromise(
      { when: () => 42 },
      undefined,
      () => ({ state: "unknown" })
    );
    expect(p.inspect()).toEqual({ state: "unknown" });
  });
});