import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection behavior", () => {
  it("should remove a rejection from unhandled rejections when it is handled", async () => {
    Q.resetUnhandledRejections();
    
    const reason = new Error("test rejection");
    const rejected = Q.reject(reason);
    
    // Handle the rejection
    await rejected.then(null, () => {});
    
    // After handling, the rejection should not be in unhandled reasons
    const unhandledReasons = Q.getUnhandledReasons();
    expect(unhandledReasons).toHaveLength(0);
  });
});