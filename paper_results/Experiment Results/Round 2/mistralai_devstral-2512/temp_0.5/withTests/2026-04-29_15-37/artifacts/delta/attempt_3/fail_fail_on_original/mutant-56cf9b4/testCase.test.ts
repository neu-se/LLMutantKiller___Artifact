import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() with retain operation without attributes', () => {
  it('should correctly handle retain operation without attributes', () => {
    const delta = new Delta().retain(2);
    const base = new Delta().insert('123456');
    const expected = new Delta().retain(2);
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});