import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly parse stack line", () => {
    const stackLine1 = "at file.js:10:2";
    const stackLine2 = "at file.js:10:20";
    const attempt1 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine1);
    const attempt2 = /at ([^ ]+):(\d+):(?:\d)$/.exec(stackLine2);
    expect(attempt1).not.toBeNull();
    expect(attempt1[1]).toBe("file.js");
    expect(attempt1[2]).toBe("10");
    expect(attempt2).toBeNull();
  });
});