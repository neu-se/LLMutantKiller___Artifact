import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly filter stack traces", () => {
    const error = new Error("Test error");
    const promise = Q.reject(error);
    const stack = promise.inspect().reason.stack;
    const lines = stack.split("\n");
    let found = false;
    for (let i = 0; i < lines.length; i++) {
      if (i >= lines.length) {
        break;
      }
      if (lines[i].includes("filterStackString")) {
        found = true;
        break;
      }
    }
    expect(found).toBe(true);
  });
});