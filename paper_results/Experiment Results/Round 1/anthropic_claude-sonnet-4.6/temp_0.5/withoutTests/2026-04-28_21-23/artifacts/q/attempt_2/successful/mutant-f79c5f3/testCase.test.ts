import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any with all rejected promises", () => {
  it("should reject when all promises are rejected", async () => {
    const p1 = Q.reject(new Error("error1"));
    const p2 = Q.reject(new Error("error2"));
    const p3 = Q.reject(new Error("error3"));

    // In the original code, pendingCount decrements on rejection and eventually
    // the deferred should reject. In the mutated code, pendingCount keeps
    // incrementing so the promise never settles.
    let settled = false;
    const promise = Q.any([p1, p2, p3]).then(
      () => { settled = true; return "fulfilled"; },
      () => { settled = true; return "rejected"; }
    );

    const result = await promise;
    expect(settled).toBe(true);
    expect(result).toBe("rejected");
  });
});