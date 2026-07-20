import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('compose() with embed retain', () => {
  it('should correctly compose when thisOp has insert and otherOp has retain with embed', () => {
    Delta.registerEmbed<string>('test', {
      compose: (a, b) => b,
      transform: (a, b) => b,
      invert: (a, b) => b,
    });

    const a = new Delta().insert({ test: 'value' });
    const b = new Delta().retain({ test: 'newValue' });
    const expected = new Delta().insert({ test: 'newValue' });
    const result = a.compose(b);

    expect(result).toEqual(expected);
    Delta.unregisterEmbed('test');
  });
});