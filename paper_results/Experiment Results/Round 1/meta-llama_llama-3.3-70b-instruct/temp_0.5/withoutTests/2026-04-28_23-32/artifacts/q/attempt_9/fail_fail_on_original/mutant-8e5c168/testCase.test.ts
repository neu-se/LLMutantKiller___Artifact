import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise", () => {
  it("should throw an error when the resolver function does not call resolve or reject in the mutated code", () => {
    const resolver = () => {};
    expect(() => Q(resolver)).toThrowError();
  });
});