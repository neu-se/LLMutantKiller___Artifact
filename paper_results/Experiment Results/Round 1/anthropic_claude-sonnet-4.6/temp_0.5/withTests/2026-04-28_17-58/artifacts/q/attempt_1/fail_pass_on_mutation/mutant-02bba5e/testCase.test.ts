import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong with null rejection reason", () => {
  it("should handle null as a rejection reason without throwing", () => {
    return new Promise<void>((resolve, reject) => {
      Q.reject(null)
        .then(
          () => {
            reject(new Error("Should not have fulfilled"));
          },
          (reason: unknown) => {
            expect(reason).toBeNull();
            resolve();
          }
        );
    });
  });
});