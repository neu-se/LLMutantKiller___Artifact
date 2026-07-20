import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise", () => {
  it("should reject when resolver is not a function", () => {
    expect(() => Q(({} as any))).toThrow(TypeError);
  });
});