import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q.coerce", () => {
  it("should reject the promise if the thenable throws an exception", () => {
    const thenable = {
      then: (resolve, reject) => {
        throw new Error("Test error");
      },
    };

    const promise = Q(thenable);
    expect(promise).rejects.toThrowError("Test error");
  });
});