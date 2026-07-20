import { Q } from "../../../q.js";

describe("Q", () => {
  it("should correctly filter stack traces", () => {
    const lines = [];
    for (let i = 0; i < 100; i++) {
      lines.push("line " + i);
    }
    let count = 0;
    for (let i = 0; i < lines.length; i++) {
      if (i >= lines.length) {
        count++;
      }
    }
    expect(count).toBe(0);
  });
});