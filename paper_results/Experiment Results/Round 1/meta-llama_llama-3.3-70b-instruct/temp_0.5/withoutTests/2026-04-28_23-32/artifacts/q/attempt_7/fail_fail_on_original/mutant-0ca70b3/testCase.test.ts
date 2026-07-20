import { Q } from "../../../q.js";

describe("Q", () => {
  it("should correctly filter stack traces", () => {
    const error = new Error("Test error");
    const promise = Q.reject(error);
    const stack = promise.inspect().reason.stack;
    const lines = stack.split("\n");
    let count = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("q.js")) {
        count++;
      }
    }
    expect(count).toBeLessThan(lines.length);
  });
});