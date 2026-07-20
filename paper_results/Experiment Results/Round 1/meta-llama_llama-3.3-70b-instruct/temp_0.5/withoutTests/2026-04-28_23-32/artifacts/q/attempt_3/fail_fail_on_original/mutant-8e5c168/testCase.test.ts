import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise", () => {
  it("should reject when resolver is not a function", () => {
    expect(() => Q(() => {})).not.toThrow();
    const promise = Q((resolve, reject) => {
      resolve("test");
    });
    expect(promise.then).toBeInstanceOf(Function);
  });
});