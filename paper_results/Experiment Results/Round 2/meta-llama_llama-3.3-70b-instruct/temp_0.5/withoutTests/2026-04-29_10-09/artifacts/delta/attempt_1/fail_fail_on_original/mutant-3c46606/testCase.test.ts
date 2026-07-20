import Delta from '../../../../../subject_repositories/delta/src/Delta';
import { Op } from '../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should transform embeds correctly', () => {
    const delta1 = new Delta();
    delta1.insert({ image: 'image1' });
    const delta2 = new Delta();
    delta2.insert({ image: 'image2' });
    Delta.registerEmbed('image', {
      compose: (a, b, keepNull) => b,
      invert: (a, b) => b,
      transform: (a, b, priority) => b,
    });
    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops[0].insert).toEqual({ image: 'image2' });
    Delta.unregisterEmbed('image');
  });
});