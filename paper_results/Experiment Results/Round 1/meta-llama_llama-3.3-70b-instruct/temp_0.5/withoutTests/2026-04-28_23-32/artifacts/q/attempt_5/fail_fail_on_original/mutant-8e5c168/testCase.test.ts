import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise", () => {
  it("should throw an error when the resolver function is empty", () => {
    const resolver = function(resolve: any, reject: any) {
      // do nothing
    };
    const promise = Q(resolver);
    expect(promise.then).toBeInstanceOf(Function);
    expect(() => Q("string")).toThrow(TypeError);
  });
});