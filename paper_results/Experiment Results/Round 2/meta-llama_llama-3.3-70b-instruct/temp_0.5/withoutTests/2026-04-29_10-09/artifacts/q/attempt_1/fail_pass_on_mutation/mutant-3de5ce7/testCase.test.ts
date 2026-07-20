import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly parse the stack line with a line number", () => {
    const stackLine = "at foo@/path/to/file.js:123";
    const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    expect(attempt3).not.toBeNull();
    expect(attempt3[1]).toBe("/path/to/file.js");
    expect(attempt3[2]).toBe("123");
  });
});