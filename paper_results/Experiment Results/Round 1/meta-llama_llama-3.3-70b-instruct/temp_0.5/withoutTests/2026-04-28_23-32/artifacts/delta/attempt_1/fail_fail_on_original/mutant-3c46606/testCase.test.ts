import { Delta } from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should transform with handler', () => {
    const delta1 = new Delta();
    delta1.insert({ embed: 'data1' });
    const delta2 = new Delta();
    delta2.insert({ embed: 'data2' });
    Delta.registerEmbed('embed', {
      compose: (a, b) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => a,
    });
    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops[0].retain).toEqual({ embed: 'data1' });
  });
});