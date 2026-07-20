import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_map collect behavior", () => {
  it("should properly map array values through allSettled", async () => {
    // allSettled uses array_map to transform promises
    // If array_map's collect.push is removed, the mapped array would be empty
    // causing allSettled to resolve with empty array instead of states
    const result = await Q.allSettled([
      Q.resolve(1),
      Q.reject(new Error("fail")),
      Q.resolve(3)
    ]);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);
    expect(result[0].state).toBe("fulfilled");
    expect(result[0].value).toBe(1);
    expect(result[1].state).toBe("rejected");
    expect(result[2].state).toBe("fulfilled");
    expect(result[2].value).toBe(3);
  });
});