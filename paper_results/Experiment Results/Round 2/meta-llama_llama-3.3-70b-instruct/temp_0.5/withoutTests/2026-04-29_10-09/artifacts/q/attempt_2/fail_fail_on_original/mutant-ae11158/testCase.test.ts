import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.nfapply", () => {
  it("should return a promise", () => {
    const callback = () => {};
    const promise = Q.nfapply(callback, [1, 2, 3]);
    expect(promise).toBeInstanceOf(Q.Promise);
  });
});