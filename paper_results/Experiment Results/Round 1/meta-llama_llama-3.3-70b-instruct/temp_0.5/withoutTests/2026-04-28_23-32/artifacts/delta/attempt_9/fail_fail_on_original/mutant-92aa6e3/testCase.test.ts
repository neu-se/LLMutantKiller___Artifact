import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

interface EmbedHandler<T> {
  compose(a: T, b: T, keepNull: boolean): T;
  invert(a: T, b: T): T;
  transform(a: T, b: T, priority: boolean): T;
}

const handler: EmbedHandler<string> = {
  compose: (a, b, keepNull) => a + b,
  invert: (a, b) => a,
  transform: (a, b, priority) => a,
};

describe('Delta', () => {
  it('should not compose embeds when action is insert and embed types are the same', () => {
    Delta.registerEmbed('image', handler);
    const delta1 = new Delta().insert({ image: 'image1' });
    const delta2 = new Delta().insert({ image: 'image2' });
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBe(2);
    expect(composedDelta.ops[0].insert).toEqual({ image: 'image1' });
    expect(composedDelta.ops[1].insert).toEqual({ image: 'image2' });
  });
});