import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should not apply retain optimization when firstOther.retain is not a number', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      transform: (a, b) => b,
      invert: (a, b) => b,
    });

    const a = new Delta().insert('A');
    const b = new Delta().retain({ test: 'value' });
    const expected = new Delta().insert('A').retain({ test: 'value' });
    expect(a.compose(b)).toEqual(expected);

    Delta.unregisterEmbed('test');
  });
});