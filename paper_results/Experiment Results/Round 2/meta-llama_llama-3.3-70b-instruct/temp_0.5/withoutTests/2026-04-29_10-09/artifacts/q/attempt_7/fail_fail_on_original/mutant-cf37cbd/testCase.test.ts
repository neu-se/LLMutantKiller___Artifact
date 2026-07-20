import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly parse stack line", () => {
    const stackLine = "at file.js:10:2";
    const attempt2Original = /at ([^ ]+):(\d+):(\d+)$/.exec(stackLine);
    expect(attempt2Original).not.toBeNull();
    const attempt2Mutated = /at ([^ ]+):(\d+):(\d)$/.exec(stackLine);
    expect(attempt2Mutated).toBeNull();
  });
});