import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose embeds when the action is "retain"', () => {
    Delta.registerEmbed('image', {
      compose: (a, b, keepNull) => {
        if (keepNull) {
          return a;
        }
        return b;
      },
      invert: (a, b) => a,
      transform: (a, b, priority) => b,
    });
    const delta1 = new Delta();
    delta1.retain({ image: 'image1' });
    const delta2 = new Delta();
    delta2.retain({ image: 'image2' });
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops[0].retain).toEqual({ image: 'image1' });
    const delta3 = new Delta();
    delta3.retain({ image: 'image3' });
    const composedDelta2 = delta1.compose(delta3);
    expect(composedDelta2.ops[0].retain).toEqual({ image: 'image1' });
    const delta4 = new Delta();
    delta4.insert({ image: 'image4' });
    const composedDelta3 = delta1.compose(delta4);
    expect(composedDelta3.ops[0].insert).toBeDefined();
    expect(composedDelta3.ops[0].retain).toBeUndefined();
    const delta5 = new Delta();
    delta5.retain({ image: 'image5' });
    const composedDelta4 = delta4.compose(delta5);
    expect(composedDelta4.ops[0].retain).toBeDefined();
    expect(composedDelta4.ops[0].insert).toBeUndefined();
    const delta6 = new Delta();
    delta6.retain({ image: 'image6' });
    const composedDelta5 = delta5.compose(delta6);
    expect(composedDelta5.ops[0].retain).toEqual({ image: 'image6' });
    const delta7 = new Delta();
    delta7.retain({ image: 'image7' });
    const composedDelta6 = delta6.compose(delta7);
    expect(composedDelta6.ops[0].retain).toEqual({ image: 'image7' });
    const delta8 = new Delta();
    delta8.retain({ image: 'image8' });
    const composedDelta7 = delta7.compose(delta8);
    expect(composedDelta7.ops[0].retain).toEqual({ image: 'image8' });
    const delta9 = new Delta();
    delta9.retain({ image: 'image9' });
    const composedDelta8 = delta8.compose(delta9);
    expect(composedDelta8.ops[0].retain).toEqual({ image: 'image9' });
    const delta10 = new Delta();
    delta10.retain({ image: 'image10' });
    const composedDelta9 = delta9.compose(delta10);
    expect(composedDelta9.ops[0].retain).toEqual({ image: 'image10' });
    const delta11 = new Delta();
    delta11.retain({ image: 'image11' });
    const composedDelta10 = delta10.compose(delta11);
    expect(composedDelta10.ops[0].retain).toEqual({ image: 'image11' });
  });
});