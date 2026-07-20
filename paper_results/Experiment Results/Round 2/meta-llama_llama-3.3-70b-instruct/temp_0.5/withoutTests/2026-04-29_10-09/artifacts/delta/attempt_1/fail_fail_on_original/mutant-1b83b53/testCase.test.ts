import { Delta } from '../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose two deltas with embeds', () => {
    const delta1 = new Delta();
    delta1.insert({ image: 'image1' }, { align: 'center' });
    const delta2 = new Delta();
    delta2.insert({ image: 'image2' }, { align: 'left' });
    const composed = delta1.compose(delta2);
    expect(composed.ops).toHaveLength(1);
    expect(composed.ops[0].retain).toBeInstanceOf(Object);
    expect(composed.ops[0].retain).toHaveProperty('image');
    expect(composed.ops[0].attributes).toHaveProperty('align', 'left');
  });
});