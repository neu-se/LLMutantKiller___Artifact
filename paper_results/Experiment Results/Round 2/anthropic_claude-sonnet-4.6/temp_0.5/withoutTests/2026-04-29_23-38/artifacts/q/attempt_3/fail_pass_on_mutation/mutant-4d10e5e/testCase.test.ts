import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise rejection handling", () => {
  it("properly rejects with a reason and tracks it", async () => {
    const reason = new Error("test rejection");
    const rejected = Q.reject(reason);
    
    const inspection = rejected.inspect();
    expect(inspection.state).toBe("rejected");
    expect(inspection.reason).toBe(reason);
    
    // Consume the rejection to avoid unhandled rejection warnings
    await rejected.then(null, () => {});
  });
});