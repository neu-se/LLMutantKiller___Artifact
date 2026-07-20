import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.nfapply", () => {
  it("should throw an error when the mutated code is used", () => {
    const callback = () => {};
    const args = [1, 2, 3];
    expect(() => Q.nfapply(callback, args)).toThrowError();
  });
});