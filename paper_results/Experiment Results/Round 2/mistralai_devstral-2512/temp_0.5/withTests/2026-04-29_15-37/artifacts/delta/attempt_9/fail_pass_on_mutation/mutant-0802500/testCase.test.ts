import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose() with retain optimization', () => {
  it('should correctly handle retain optimization when first operation is insert', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(1).insert('X').retain(1);
    const result = a.compose(b);
    const expected = new Delta().insert('AXB').insert('C');
    expect(result).toEqual(expected);
  });
});