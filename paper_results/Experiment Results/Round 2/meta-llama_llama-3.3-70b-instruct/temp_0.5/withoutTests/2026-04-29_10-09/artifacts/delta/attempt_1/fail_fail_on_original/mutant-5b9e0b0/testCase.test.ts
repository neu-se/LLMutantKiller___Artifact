import { Delta } from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose embeds correctly', () => {
    const delta1 = new Delta();
    delta1.insert({ image: 'image1' });

    const delta2 = new Delta();
    delta2.insert({ image: 'image2' });

    const composed = delta1.compose(delta2);
    expect(composed.ops[0].insert).toEqual({ image: expect.any(Object) });
  });
});