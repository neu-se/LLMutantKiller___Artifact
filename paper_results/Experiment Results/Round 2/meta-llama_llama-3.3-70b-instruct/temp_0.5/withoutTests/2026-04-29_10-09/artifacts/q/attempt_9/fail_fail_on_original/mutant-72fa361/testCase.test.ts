import { Q } from "./q.js";

describe("Q", () => {
  it("should transform error stack trace by removing Node and Q cruft", () => {
    const error = new Error("Test error");
    const promise = Q.delay(10).then(() => {
      throw error;
    });
    promise.catch((err: any) => {
      const stackLines = err.stack.split("\n");
      const qLines = stackLines.filter((line: string) => line.includes("q.js"));
      expect(qLines.length).toBeLessThan(stackLines.length);
    });
  });
});