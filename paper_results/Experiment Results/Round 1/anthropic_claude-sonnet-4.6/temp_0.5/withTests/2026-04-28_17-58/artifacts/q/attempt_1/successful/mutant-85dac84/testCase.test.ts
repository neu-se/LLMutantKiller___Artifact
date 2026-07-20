import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("thenReject", () => {
  it("should reject the promise with the given reason after the original promise resolves", () => {
    const reason = new Error("test rejection reason");
    
    return Q.resolve("some value")
      .thenReject(reason)
      .then(
        () => {
          throw new Error("Expected promise to be rejected, but it was fulfilled");
        },
        (actualReason: unknown) => {
          expect(actualReason).toBe(reason);
        }
      );
  });
});