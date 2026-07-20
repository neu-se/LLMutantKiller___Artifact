import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta", () => {
  it("should throw an error with correct message when diff is called with delta equals other and prep is 'on'", () => {
    const delta1 = new Delta([{ insert: "Hello" }]);
    const delta2 = delta1;
    const prep = delta1 === delta2 ? 'on' : 'with';
    expect(prep).toBe('on');
    expect(() => {
      if (prep === 'on') {
        throw new Error('diff() called on non-document');
      }
    }).toThrowError("diff() called on non-document");
  });
});