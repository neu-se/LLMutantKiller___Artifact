import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('OpIterator peekType via Delta operations', () => {
  it('transform correctly identifies retain ops via peekType', () => {
    // This uses peekType() internally - if retain returns undefined instead of 'retain',
    // the transform logic breaks
    const a = new Delta().retain(3);
    const b = new Delta().retain(3, { bold: true });
    const result = a.transform(b, true);
    // If peekType() doesn't return 'retain' for retain ops, transform will behave incorrectly
    expect(result).toEqual(new Delta().retain(3, { bold: true }));
  });
});