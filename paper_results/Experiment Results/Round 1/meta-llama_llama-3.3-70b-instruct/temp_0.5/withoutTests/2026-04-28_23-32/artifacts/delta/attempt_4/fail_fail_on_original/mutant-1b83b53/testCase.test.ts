import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose two deltas with embeds', () => {
    const delta1 = new Delta();
    const delta2 = new Delta();
    Delta.registerEmbed('test', {
      compose: (a: any, b: any, keepNull: boolean) => a,
      invert: (a: any, b: any) => a,
      transform: (a: any, b: any, priority: boolean) => a,
    });
    delta1.retain({ test: 'value1' });
    delta2.retain({ test: 'value2' });
    const composed = delta1.compose(delta2);
    expect(composed.ops[0].retain).toEqual({ test: 'value1' });
    // Test the mutation by checking if the 'retain' property is correctly composed
    // when action is 'retain'
    delta1.retain({ test: 'value3' });
    delta2.retain({ test: 'value4' });
    const composed2 = delta1.compose(delta2);
    expect(composed2.ops[0].retain).toEqual({ test: 'value3' });
    // If action is not 'retain', the composed value should be the same as the first delta's value
    const delta3 = new Delta();
    delta3.retain({ test: 'value5' });
    delta2.retain({ test: 'value6' });
    const composed3 = delta3.compose(delta2);
    expect(composed3.ops[0].retain).toEqual({ test: 'value5' });
  });
});