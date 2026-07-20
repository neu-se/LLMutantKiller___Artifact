import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("allSettled behavior test", () => {
  it("should correctly identify fulfilled promises in allSettled", async () => {
    const promises = [
      Q.resolve(1),
      Q.resolve(2),
      Q.reject(new Error("test error"))
    ];

    const results = await Q.allSettled(promises);

    expect(results).toEqual([
      { state: "fulfilled", value: 1 },
      { state: "fulfilled", value: 2 },
      { state: "rejected", reason: new Error("test error") }
    ]);

    // Verify that fulfilled promises are correctly identified
    expect(results[0].state).toBe("fulfilled");
    expect(results[1].state).toBe("fulfilled");
    expect(results[2].state).toBe("rejected");
  });
});