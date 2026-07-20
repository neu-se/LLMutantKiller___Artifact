import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.join error message", () => {
  it("should include the prefix \"Q can't join: not the same:\" when joining two different values", async () => {
    let rejectionReason: Error | undefined;

    try {
      await Q.join(Q(1), Q(2));
    } catch (e) {
      rejectionReason = e as Error;
    }

    expect(rejectionReason).toBeDefined();
    expect(rejectionReason!.message).toContain("Q can't join: not the same:");
  });
});