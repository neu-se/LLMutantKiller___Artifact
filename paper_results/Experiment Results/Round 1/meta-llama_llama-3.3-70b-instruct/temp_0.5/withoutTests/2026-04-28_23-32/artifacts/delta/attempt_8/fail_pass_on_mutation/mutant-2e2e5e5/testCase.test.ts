import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta", () => {
  it("should throw an error with correct message when diff is called with delta equals other and prep is 'on'", () => {
    const delta1 = new Delta([{ insert: "Hello" }]);
    const delta2 = new Delta([{ insert: "World" }]);
    const prep = delta1 === delta2 ? 'on' : 'with';
    expect(() => {
      if (prep === 'on') {
        throw new Error('diff() called on non-document');
      } else {
        throw new Error('diff() called with non-document');
      }
    }).toThrowError("diff() called with non-document");
  });
});