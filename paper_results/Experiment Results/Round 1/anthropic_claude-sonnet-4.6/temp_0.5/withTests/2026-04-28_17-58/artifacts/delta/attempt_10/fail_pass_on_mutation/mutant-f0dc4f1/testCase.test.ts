import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform uses peekType', () => {
  it('retain op is correctly identified causing proper transform behavior', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1, { bold: true });
    // If peekType returns 'insert' instead of 'retain' for retain ops,
    // transform would treat retain as insert and produce wrong result
    const result = a.transform(b, true);
    expect(result).toEqual(new Delta().retain(1).retain(1, { bold: true }));
  });
});