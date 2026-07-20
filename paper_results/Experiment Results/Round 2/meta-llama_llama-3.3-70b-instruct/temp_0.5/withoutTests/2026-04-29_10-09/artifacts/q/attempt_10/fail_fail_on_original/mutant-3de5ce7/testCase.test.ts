import { Q } from '../../../../../../../../subject_repositories/q/q.js';

describe("Q", () => {
  it("should correctly parse the stack line with a line number", () => {
    const error = new Error();
    error.stack = "at foo@/path/to/file.js:123";
    const makeStackTraceLong = Q.makeStackTraceLong;
    const promise = {};
    makeStackTraceLong(error, promise);
    expect(error.stack).toContain("123");
  });

  it("should not parse the stack line with a non-numeric line number", () => {
    const error = new Error();
    error.stack = "at foo@/path/to/file.js:abc";
    const makeStackTraceLong = Q.makeStackTraceLong;
    const promise = {};
    expect(() => {
      makeStackTraceLong(error, promise);
    }).toThrowError();
  });
});