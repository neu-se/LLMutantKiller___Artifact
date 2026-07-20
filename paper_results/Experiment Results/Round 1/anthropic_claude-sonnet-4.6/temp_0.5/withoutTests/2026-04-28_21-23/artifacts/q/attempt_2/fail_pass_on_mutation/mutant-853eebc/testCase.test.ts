import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_map fallback via allSettled", () => {
  it("should correctly map promises to their settled states including rejected ones", async () => {
    const err = new Error("fail");
    const promises = [
      Q.resolve(42),
      Q.reject(err),
    ];

    // allSettled uses array_map internally
    const results = await Q.allSettled(promises);

    expect(results).toHaveLength(2);
    expect(results[0]).toEqual({ state: "fulfilled", value: 42 });
    expect(results[1]).toEqual({ state: "rejected", reason: err });
  });
});