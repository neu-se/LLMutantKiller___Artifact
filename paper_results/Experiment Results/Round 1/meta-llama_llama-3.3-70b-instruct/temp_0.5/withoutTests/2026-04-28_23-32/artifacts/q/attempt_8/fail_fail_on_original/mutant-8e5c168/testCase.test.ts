import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise", () => {
  it("should resolve a promise when given a resolver function", () => {
    const resolver = (resolve: any) => {
      resolve("test");
    };
    const promise = Q(resolver);
    promise.then((value: any) => {
      expect(value).toBe("test");
    });
  });
});