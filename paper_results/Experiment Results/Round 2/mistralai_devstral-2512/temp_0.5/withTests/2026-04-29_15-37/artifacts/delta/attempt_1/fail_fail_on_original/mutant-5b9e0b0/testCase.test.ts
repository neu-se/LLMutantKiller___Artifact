import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with embed retain', () => {
  it('should correctly compose when thisOp has retain embed and otherOp has retain embed', () => {
    Delta.registerEmbed<string>('test', {
      compose: (a, b) => b,
      transform: (a, b) => b,
      invert: (a, b) => b,
    });

    const a = new Delta().retain({ test: 'a' });
    const b = new Delta().retain({ test: 'b' });
    const expected = new Delta().retain({ test: 'ba' });
    expect(a.compose(b)).toEqual(expected);

    Delta.unregisterEmbed('test');
  });
});