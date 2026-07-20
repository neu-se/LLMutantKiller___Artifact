import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q allSettled", () => {
  it("should settle all promises including rejected ones", async () => {
    const promises = [Q(1), Q.reject(new Error("fail")), Q(3)];
    const results = await Q.allSettled(promises);
    expect(results[0].state).toBe("fulfilled");
    expect(results[1].state).toBe("rejected");
    expect(results[2].state).toBe("fulfilled");
  });
});