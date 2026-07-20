import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("thenReject", () => {
  it("should return a rejected promise with the given reason when the original promise is fulfilled", () => {
    const reason = new Error("test rejection reason");
    
    return Q.resolve("some value")
      .thenReject(reason)
      .then(
        () => {
          throw new Error("Expected promise to be rejected but it was fulfilled");
        },
        (actualReason: unknown) => {
          expect(actualReason).toBe(reason);
        }
      );
  });
});