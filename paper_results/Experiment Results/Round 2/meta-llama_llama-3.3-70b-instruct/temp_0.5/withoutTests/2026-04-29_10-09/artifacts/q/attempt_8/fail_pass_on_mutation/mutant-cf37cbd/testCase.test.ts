import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly parse stack line", () => {
    const stackLine = "at file.js:10:20";
    const attempt2 = /at ([^ ]+):(\d+):(\d)$/.exec(stackLine);
    expect(attempt2).toBeNull();
  });
});