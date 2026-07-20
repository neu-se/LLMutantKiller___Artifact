import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with embed retain', () => {
  it('should correctly handle retain embed composition', () => {
    Delta.registerEmbed<string>('test', {
      compose: (a, b, keepNull) => keepNull ? b : a + b,
      transform: (a, b) => b,
      invert: (a, b) => b,
    });

    const a = new Delta().retain({ test: 'value' });
    const b = new Delta().retain({ test: 'newValue' });
    const result = a.compose(b);

    expect(result.ops[0].retain).toEqual({ test: 'newValuenewValue' });
    Delta.unregisterEmbed('test');
  });
});