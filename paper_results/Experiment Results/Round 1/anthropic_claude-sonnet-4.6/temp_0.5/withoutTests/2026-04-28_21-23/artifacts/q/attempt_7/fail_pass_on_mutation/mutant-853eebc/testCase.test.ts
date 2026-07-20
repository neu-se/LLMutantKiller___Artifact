import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.allSettled", () => {
  it("should resolve with inspection objects for all settled promises", async () => {
    const result = await Q.allSettled([
      Q.resolve(1),
      Q.reject(new Error("fail")),
      Q.resolve(3)
    ]);

    expect(result).toHaveLength(3);
    expect(result[0].state).toBe("fulfilled");
    expect(result[0].value).toBe(1);
    expect(result[1].state).toBe("rejected");
    expect(result[2].state).toBe("fulfilled");
    expect(result[2].value).toBe(3);
  });
});