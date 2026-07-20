import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise", () => {
  it("should check the functionality of the promise function", () => {
    const resolver = (resolve: any, reject: any) => {
      resolve("test");
    };
    const promise = Q(resolver);
    expect(typeof promise.then).toBe("function");
  });
});