import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise constructor", () => {
  it("should create a promise when given a valid resolver function", () => {
    const promise = Q.promise((resolve) => {
      resolve("test value");
    });
    return promise.then((value) => {
      expect(value).toBe("test value");
    });
  });
});