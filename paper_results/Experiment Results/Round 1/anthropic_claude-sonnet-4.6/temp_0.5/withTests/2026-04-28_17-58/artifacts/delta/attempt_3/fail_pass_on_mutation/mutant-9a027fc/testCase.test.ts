import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() numeric retain mutation detection', () => {
  it('transforms retain with attributes using computed length not raw otherData', () => {
    const a = new Delta().retain(3);
    const b = new Delta().retain(5, { bold: true });
    const result = a.transform(b, false);
    const expected = new Delta().retain(5, { bold: true });
    expect(result).toEqual(expected);
  });
});