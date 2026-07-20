import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('retain + retain with embed object uses embed as transformedData not numeric length', () => {
    Delta.registerEmbed('video', {
      compose: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
      invert: (a: unknown, b: unknown) => a,
    });

    // thisOp.retain = { video: 'a' } (object), otherOp.retain = { video: 'b' } (object)
    // otherData = { video: 'b' } which is a non-null object
    // Both original and mutated: typeof object === 'object' && (object !== null / true) => true
    // transformedData = otherData = { video: 'b' }
    // The embed handler.transform is then called, returning 'b'
    // So transformedData = { video: 'b' }
    const a = new Delta().retain({ video: 'a' });
    const b = new Delta().retain({ video: 'b' });

    const result = a.transform(b, false);
    expect(result).toEqual(new Delta().retain({ video: 'b' }));

    Delta.unregisterEmbed('video');
  });
});