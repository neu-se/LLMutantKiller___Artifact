import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should transform correctly when thisData is an object and otherData is an object', () => {
    const delta1 = new Delta().insert({ embed: 'Hello' });
    const delta2 = new Delta().insert({ embed: 'World' });
    Delta.registerEmbed('embed', {
      compose: (a: string, b: string) => a + b,
      invert: (a: string, b: string) => a + b,
      transform: (a: string, b: string, priority: boolean) => priority? b : a,
    });
    const transformedDelta = delta1.transform(delta2, true);
    expect(transformedDelta.ops[0].retain).toEqual({ embed: 'World' });
  });
});