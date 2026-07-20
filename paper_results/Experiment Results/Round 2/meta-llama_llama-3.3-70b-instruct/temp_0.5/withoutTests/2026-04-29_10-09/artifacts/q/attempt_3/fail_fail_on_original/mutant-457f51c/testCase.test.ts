import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should not set exception property for fulfilled promises", () => {
    const promise = Q.resolve("test");
    expect(promise.exception).toBeUndefined();
  });

  it("should throw an error when trying to access exception property of a fulfilled promise in the mutated code", () => {
    const promise = Q.resolve("test");
    expect(() => promise.exception).toThrow();
  });
});