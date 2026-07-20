import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise", () => {
  it("should throw an error when the resolver function is empty in the mutated code", () => {
    const resolver = function(resolve: any, reject: any) {
    };
    const promise = Q(resolver);
    expect(promise).toBeUndefined();
  });
});