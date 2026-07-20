import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('transform with mismatched embed types uses otherData as transformedData without calling handler', () => {
    Delta.registerEmbed('img', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => ({ transformed: true }),
    });
    Delta.registerEmbed('video', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => ({ transformed: true }),
    });

    const thisDelta = new Delta().retain({ img: { id: 1 } });
    const otherDelta = new Delta().retain({ video: { id: 2 } });
    
    const result = thisDelta.transform(otherDelta, false);
    Delta.unregisterEmbed('img');
    Delta.unregisterEmbed('video');
    
    // Mismatched embed types: img vs video
    // transformedData = otherData = { video: { id: 2 } } (non-null object, same in both)
    // Embed handler block: embedType 'img' !== 'video', so skipped
    // delta.retain({ video: { id: 2 } })
    expect(result.ops).toEqual([{ retain: { video: { id: 2 } } }]);
  });
});