import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('invert()', () => {
  it('should correctly invert a delta with a retain operation', () => {
    const delta = new Delta().retain(1);
    const base = new Delta().insert('a');
    const expected = new Delta().retain(1);
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    expect(() => delta.invert(new Delta().retain(1))).toThrowError();
  });
});