import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("allSettled", () => {
  it("should return inspect snapshots for each promise including rejected ones", async () => {
    const fulfilled = Q(42);
    const rejected = Q.reject(new Error("oops"));

    const result = await Q.allSettled([fulfilled, rejected]);

    expect(result).toEqual([
      { state: "fulfilled", value: 42 },
      { state: "rejected", reason: new Error("oops") }
    ]);
  });
});