import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly parse the stack line with a line number", () => {
    const error = new Error();
    error.stack = "at foo@/path/to/file.js:123";
    const makeStackTraceLong = Q.makeStackTraceLong;
    makeStackTraceLong(error, {});
    expect(error.stack).toContain("123");
    const error2 = new Error();
    error2.stack = "at foo@/path/to/file.js:abc";
    expect(() => {
      makeStackTraceLong(error2, {});
    }).toThrowError();
  });
});