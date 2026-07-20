import Delta from '../../src/Delta';

describe('compose() with embed retain', () => {
  it('should handle null embed retain correctly', () => {
    const a = new Delta().insert({ embed: 1 });
    const b = new Delta().delete(1);
    const expected = new Delta().delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});