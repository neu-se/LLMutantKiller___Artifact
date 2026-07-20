import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all behavior with rejected promises", () => {
  it("should reject when any promise in the array is rejected", async () => {
    const rejectionReason = new Error("test rejection");
    const promises = [
      Q.resolve(1),
      Q.reject(rejectionReason),
      Q.resolve(3)
    ];

    let rejected = false;
    let resolved = false;

    await Q.all(promises).then(
      () => { resolved = true; },
      () => { rejected = true; }
    );

    expect(rejected).toBe(true);
    expect(resolved).toBe(false);
  });
});