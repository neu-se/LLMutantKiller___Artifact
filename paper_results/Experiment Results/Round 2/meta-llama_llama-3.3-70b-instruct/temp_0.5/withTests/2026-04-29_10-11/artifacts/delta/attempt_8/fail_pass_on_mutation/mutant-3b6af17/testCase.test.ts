import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transform with embed', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => a,
      transform: (a, b, priority) => b,
      invert: (a, b) => a,
    });
    const delta1 = new Delta().retain({ test: { value: 'a' } });
    const delta2 = new Delta().retain({ test: { value: 'b' } });
    const result = delta1.transform(delta2);
    const handler = Delta.getHandler('test');
    // This line should fail on the mutated code
    expect(handler.transform(delta1.ops[0].retain.test, delta2.ops[0].retain.test, true)).toEqual(delta2.ops[0].retain.test);
    Delta.unregisterEmbed('test');
  });
});