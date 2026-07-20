describe("Q module", () => {
  it("should export a working Q function that can fulfill promises", () => {
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    expect(typeof Q).toBe("function");

    const p = Q(123);
    expect(Q.isPromise(p)).toBe(true);
    expect(p.inspect()).toEqual({ state: "fulfilled", value: 123 });
  });
});