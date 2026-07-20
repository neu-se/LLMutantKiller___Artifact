import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.allSettled", () => {
  it("should return a promise that resolves to an array of state objects for mixed fulfilled and rejected promises", async () => {
    const promises = [
      Q.resolve(1),
      Q.reject(new Error("failed")),
      Q.resolve(3),
    ];

    const result = await Q.allSettled(promises);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);
    expect(result[0]).toEqual({ state: "fulfilled", value: 1 });
    expect(result[1].state).toBe("rejected");
    expect(result[1].reason).toBeInstanceOf(Error);
    expect(result[1].reason.message).toBe("failed");
    expect(result[2]).toEqual({ state: "fulfilled", value: 3 });
  });
});