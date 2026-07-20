import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise", () => {
  it("should reject when resolver is not a function", () => {
    const resolver = () => {};
    const promise = Q(resolver);
    expect(promise.then).toBeInstanceOf(Function);
    expect(() => Q("string")).toThrow(TypeError);
  });
});