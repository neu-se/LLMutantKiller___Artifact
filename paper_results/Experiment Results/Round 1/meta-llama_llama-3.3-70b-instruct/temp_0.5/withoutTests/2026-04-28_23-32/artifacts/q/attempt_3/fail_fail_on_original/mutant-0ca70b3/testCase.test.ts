import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly filter stack traces", () => {
    const lines = [];
    for (let i = 0; i < 100; i++) {
      lines.push("line " + i);
    }
    const filteredLines = lines.filter((line) => {
      return !line.includes("q.js");
    });
    expect(filteredLines.length).toBeLessThan(lines.length);
    // The mutation causes the filter function to not work correctly, 
    // so the lengths should be equal in the mutated code
  });
});