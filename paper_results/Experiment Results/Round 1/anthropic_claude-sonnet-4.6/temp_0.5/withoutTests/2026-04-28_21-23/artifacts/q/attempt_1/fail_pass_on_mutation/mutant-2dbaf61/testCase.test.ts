import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise basic functionality", () => {
  it("should correctly resolve a fulfilled promise and support allSettled", async () => {
    const p1 = Q.resolve(1);
    const p2 = Q.resolve(2);
    const p3 = Q.reject(new Error("fail"));

    const results = await Q.allSettled([p1, p2, p3]);
    
    expect(results[0].state).toBe("fulfilled");
    expect(results[0].value).toBe(1);
    expect(results[1].state).toBe("fulfilled");
    expect(results[1].value).toBe(2);
    expect(results[2].state).toBe("rejected");
    expect(results[2].reason.message).toBe("fail");
  });
});