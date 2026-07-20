import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should transform correctly when otherData is null', () => {
    const delta1 = new Delta();
    delta1.retain({ test: 'data1' }, null);
    const delta2 = new Delta();
    delta2.retain({ test: 'data2' }, null);
    Delta.registerEmbed('test', {
      compose: (a, b, keepNull) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => a,
    });
    const transformed = delta1.transform(delta2);
    expect(transformed.ops[0].retain).toEqual({ test: 'data1' });
  });
});