import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('embed transform uses handler result not raw otherData', () => {
    Delta.registerEmbed('img', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => 'transformed',
    });

    const thisDelta = new Delta().retain({ img: 'original' });
    const otherDelta = new Delta().retain({ img: 'other' });
    
    const result = thisDelta.transform(otherDelta, false);
    Delta.unregisterEmbed('img');
    
    expect(result.ops).toEqual([{ retain: { img: 'transformed' } }]);
  });
});