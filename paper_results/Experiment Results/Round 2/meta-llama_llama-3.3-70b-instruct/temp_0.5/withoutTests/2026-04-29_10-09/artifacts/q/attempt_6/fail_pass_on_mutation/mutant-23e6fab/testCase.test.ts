import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly handle conditional check for Firefox-style stack traces", () => {
    const stackLine = "@/path/to/file:10";
    const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    expect(attempt3).not.toBeNull();
  });
});