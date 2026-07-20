import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("allSettled", () => {
  it("should return an array of inspection snapshots for a mix of fulfilled and rejected promises", async () => {
    const result = await Q.allSettled([1, Q(2), Q.reject(3)]);
    expect(result).toEqual([
      { state: "fulfilled", value: 1 },
      { state: "fulfilled", value: 2 },
      { state: "rejected", reason: 3 }
    ]);
  });
});