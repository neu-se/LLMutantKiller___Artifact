import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta transform', () => {
  it('transforms retain with embed object using handler when both are objects', () => {
    Delta.registerEmbed('custom', {
      compose: (a: any, b: any, keepNull: boolean) => ({ ...a, ...b }),
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => ({ transformed: true, priority }),
    });
    const a = new Delta().retain({ custom: { x: 1 } });
    const b = new Delta().retain({ custom: { y: 2 } });
    const result = a.transform(b, true);
    Delta.unregisterEmbed('custom');
    expect(result.ops).toEqual([{ retain: { custom: { transformed: true, priority: true } } }]);
  });
});