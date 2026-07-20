import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert()', () => {
  it('round trip with retain and attributes', () => {
    const base = new Delta().insert('hello');
    const delta = new Delta().retain(5, { bold: true });
    const inverted = delta.invert(base);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
    expect(inverted).toEqual(new Delta().retain(5, { bold: null }));
  });
});