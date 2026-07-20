import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform where this has longer retain than other with attributes on other', () => {
    const a = new Delta().retain(3, { color: 'blue' });
    const b = new Delta().retain(1, { bold: true });
    const expected = new Delta().retain(1, { bold: true });
    expect(a.transform(b, true)).toEqual(expected);
  });
});