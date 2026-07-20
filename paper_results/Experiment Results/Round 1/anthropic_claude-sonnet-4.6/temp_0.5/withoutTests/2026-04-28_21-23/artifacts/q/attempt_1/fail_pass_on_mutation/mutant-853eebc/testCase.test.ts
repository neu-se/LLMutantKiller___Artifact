import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.allSettled", () => {
  it("should return an array of inspection objects for all promises", async () => {
    const promises = [
      Q.resolve(1),
      Q.resolve(2),
      Q.resolve(3),
    ];

    const results = await Q.allSettled(promises);

    expect(results).toHaveLength(3);
    expect(results[0]).toEqual({ state: "fulfilled", value: 1 });
    expect(results[1]).toEqual({ state: "fulfilled", value: 2 });
    expect(results[2]).toEqual({ state: "fulfilled", value: 3 });
  });
});