import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("allSettled", () => {
  it("should return inspect snapshots for a mix of fulfilled and rejected promises", async () => {
    const result = await Q.allSettled([Q(1), Q.reject(new Error("fail")), Q(3)]);
    expect(result).toEqual([
      { state: "fulfilled", value: 1 },
      { state: "rejected", reason: expect.any(Error) },
      { state: "fulfilled", value: 3 },
    ]);
  });
});