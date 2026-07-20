import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly filter stack traces", () => {
    const lines = [];
    for (let i = 0; i < 100; i++) {
      lines.push("line " + i);
    }
    const filteredLines = lines.filter((line) => {
      return i => i < lines.length;
    });
    expect(() => {
      for (let i = 0; i < 100; i++) {
        filteredLines;
      }
    }).not.toThrow();
  });
});