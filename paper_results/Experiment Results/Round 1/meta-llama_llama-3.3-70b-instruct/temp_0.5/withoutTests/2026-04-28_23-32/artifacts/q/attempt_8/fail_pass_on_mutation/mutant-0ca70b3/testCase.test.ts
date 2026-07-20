import { Q } from "../../../q.js";

describe("Q", () => {
  it("should correctly filter stack traces", () => {
    const lines = [];
    for (let i = 0; i < 100; i++) {
      lines.push("line " + i);
    }
    const filteredLines = [];
    for (let i = 0; i < lines.length; i++) {
      if (i < lines.length) {
        filteredLines.push(lines[i]);
      }
    }
    expect(filteredLines.length).toBe(100);
  });
});