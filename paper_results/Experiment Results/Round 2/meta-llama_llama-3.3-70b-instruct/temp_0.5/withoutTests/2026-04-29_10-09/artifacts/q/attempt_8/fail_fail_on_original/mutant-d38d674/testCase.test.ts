import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q Promise", () => {
  it("should throw when creating a promise with an undefined fallback in the mutated code", () => {
    const promise = Q.Promise({}, undefined);
    expect(() => promise).toThrow();
  });
});