import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('optimization does not merge consecutive inserts pushed directly to ops array', () => {
    const a = new Delta().insert('A').insert('B').delete(1);
    const b = new Delta().retain(2).retain(1, { bold: true });
    const expected = new Delta().insert('AB').retain(1, { bold: true }).delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});