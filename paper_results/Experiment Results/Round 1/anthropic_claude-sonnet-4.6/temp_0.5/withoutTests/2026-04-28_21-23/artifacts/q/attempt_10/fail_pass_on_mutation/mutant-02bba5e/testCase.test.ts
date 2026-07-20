import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.allSettled with null rejection", () => {
  it("should settle with null rejection reason", async () => {
    const results = await Q.allSettled([Q.reject(null), Q.resolve(1)]);
    expect(results[0]).toEqual({ state: "rejected", reason: null });
    expect(results[1]).toEqual({ state: "fulfilled", value: 1 });
  });
});