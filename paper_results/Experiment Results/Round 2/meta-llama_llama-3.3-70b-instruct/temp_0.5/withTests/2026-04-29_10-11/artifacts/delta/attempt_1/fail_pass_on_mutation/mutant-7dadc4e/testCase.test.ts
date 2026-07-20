import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should transform correctly with priority', () => {
    const a = new Delta().retain(1);
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
    expect(a.transform(b, true)).toEqual(expected);
  });

  it('should transform correctly without priority', () => {
    const a = new Delta().retain(1);
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
    expect(a.transform(b)).toEqual(expected);
  });

  it('should fail with mutated code', () => {
    const a = new Delta().retain(1);
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const expected = new Delta().retain(1);
    expect(() => a.transform(b)).not.toEqual(expected);
  });
});