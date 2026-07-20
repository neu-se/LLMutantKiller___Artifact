import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q.coerce", () => {
  it("should reject the promise if the thenable throws an exception", () => {
    const thenable = {
      then: (resolve: any, reject: any) => {
        throw new Error("Test error");
      },
    };

    const promise = Q.coerce(thenable);
    expect(promise).rejects.toThrowError("Test error");
  });
});