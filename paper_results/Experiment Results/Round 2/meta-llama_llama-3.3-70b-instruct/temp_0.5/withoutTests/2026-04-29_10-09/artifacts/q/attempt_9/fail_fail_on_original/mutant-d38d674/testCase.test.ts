import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q Promise", () => {
  it("should not throw when creating a promise with an undefined fallback", () => {
    const promise = Q.Promise({}, undefined);
    expect(() => promise).not.toThrow();
  });
});