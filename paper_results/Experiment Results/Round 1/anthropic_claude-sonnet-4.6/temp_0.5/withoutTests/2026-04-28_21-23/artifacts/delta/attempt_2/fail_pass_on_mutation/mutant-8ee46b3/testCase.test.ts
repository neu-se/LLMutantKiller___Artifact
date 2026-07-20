import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta transform', () => {
  it('correctly handles transform where otherData is undefined', () => {
    const a = new Delta().retain(2);
    // b has an op where retain is undefined - use an object embed retain
    const b = new Delta().retain({ image: { src: 'a' } });
    // Register a handler
    Delta.registerEmbed('image', {
      compose: (a: any, b: any) => ({ ...a, ...b }),
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
    });
    const result = a.transform(b, false);
    Delta.unregisterEmbed('image');
    expect(result.ops).toEqual([{ retain: { image: { src: 'a' } } }]);
  });
});