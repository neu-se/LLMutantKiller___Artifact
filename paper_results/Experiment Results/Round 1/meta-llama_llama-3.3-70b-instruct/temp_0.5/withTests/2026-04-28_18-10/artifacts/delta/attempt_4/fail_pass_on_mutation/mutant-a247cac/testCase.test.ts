import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta compose', () => {
  it('should correctly compose two deltas and handle optimization', () => {
    const a = new Delta().insert('A').retain(1);
    const b = new Delta().retain(1).insert('B');
    const composed = a.compose(b);
    const expected = new Delta().insert('A').insert('B');
    expect(composed).toEqual(expected);
  });
});