import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q allSettled", () => {
  it("returns states for all promises including rejected ones", async () => {
    const promises = [
      Q.resolve(1),
      Q.reject(new Error("fail")),
      Q.resolve(3)
    ];
    
    const results = await Q.allSettled(promises);
    
    expect(results).toHaveLength(3);
    expect(results[0]).toEqual({ state: "fulfilled", value: 1 });
    expect(results[1].state).toBe("rejected");
    expect(results[1].reason).toBeInstanceOf(Error);
    expect(results[2]).toEqual({ state: "fulfilled", value: 3 });
    
    // Prevent unhandled rejection
    await Q.allSettled(promises).then(null, () => {});
  });
});