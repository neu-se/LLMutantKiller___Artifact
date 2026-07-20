import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should correctly compose two deltas with embeds', () => {
    const delta1 = new Delta();
    delta1.insert({ image: 'image1' });
    const delta2 = new Delta();
    delta2.insert({ image: 'image2' });
    const composed = delta1.compose(delta2);
    if (composed.ops[0].retain && typeof composed.ops[0].retain === 'object') {
      const embedType = Object.keys(composed.ops[0].retain)[0];
      expect(embedType).toBe('image');
    } else {
      throw new Error('Expected retain to be an object');
    }
  });
});