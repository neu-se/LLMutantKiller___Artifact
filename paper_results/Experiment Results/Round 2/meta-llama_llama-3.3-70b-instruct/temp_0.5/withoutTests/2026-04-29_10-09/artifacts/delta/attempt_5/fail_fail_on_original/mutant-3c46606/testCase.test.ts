import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should transform embeds correctly', () => {
    const delta1 = new Delta();
    delta1.insert({ image: 'image1' });
    const delta2 = new Delta();
    delta2.insert({ image: 'image2' });
    Delta.registerEmbed('image', {
      compose: (a: any, b: any, keepNull: boolean) => {
        if (a !== null && b !== null) {
          return b;
        } else {
          return a;
        }
      },
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => {
        if (priority) {
          return b;
        } else {
          return a;
        }
      },
    });
    const transformedDelta = delta1.transform(delta2, true);
    expect(transformedDelta.ops[0].insert).toEqual({ image: 'image2' });
    Delta.unregisterEmbed('image');
  });
});