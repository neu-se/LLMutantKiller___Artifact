import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
  it("should reject the promise if the thenable throws an exception", (done) => {
    const thenable = {
      then: (resolve: any, reject: any) => {
        throw new Error("Test error");
      },
    };

    const promise = Q(thenable);
    promise.then(() => {
      done.fail("Promise should be rejected");
    }).catch((error: any) => {
      expect(error.message).toBe("Test error");
      done();
    });
  });
});