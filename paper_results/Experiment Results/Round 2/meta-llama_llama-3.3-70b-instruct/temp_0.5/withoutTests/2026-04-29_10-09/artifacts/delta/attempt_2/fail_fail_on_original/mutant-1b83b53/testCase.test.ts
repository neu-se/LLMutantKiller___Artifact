import { Delta } from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should correctly compose two deltas with embeds', () => {
    const delta1 = new Delta();
    delta1.insert({ image: 'image1' });
    const delta2 = new Delta();
    delta2.insert({ image: 'image2' });
    const composed = delta1.compose(delta2);
    expect(composed.ops).toHaveLength(2);
    expect(composed.ops[0].insert).toHaveProperty('image', 'image1');
    expect(composed.ops[1].insert).toHaveProperty('image', 'image2');
  });
});