import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should not have an exception property for fulfilled promises", () => {
    const promise = Q.resolve("test");
    expect(() => promise.exception).toThrowError();
  });
});