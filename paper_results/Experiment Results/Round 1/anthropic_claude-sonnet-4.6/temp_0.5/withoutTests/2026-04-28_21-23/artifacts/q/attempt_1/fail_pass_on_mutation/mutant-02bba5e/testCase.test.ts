import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong with null error", () => {
  it("should handle null rejection reason without throwing", async () => {
    // When a promise is rejected with null, the rejection handler should
    // receive null as the reason. In the mutated code, makeStackTraceLong
    // will try to access properties on null, causing a TypeError.
    const result = await new Promise<any>((resolve) => {
      Q.reject(null).then(
        () => resolve({ type: "fulfilled", value: undefined }),
        (reason: any) => resolve({ type: "rejected", reason: reason })
      );
    });

    // Original: rejection handler receives null
    // Mutated: makeStackTraceLong throws TypeError when accessing null.stack,
    // which gets caught and becomes a new rejection with TypeError
    expect(result.type).toBe("rejected");
    expect(result.reason).toBeNull();
  });
});