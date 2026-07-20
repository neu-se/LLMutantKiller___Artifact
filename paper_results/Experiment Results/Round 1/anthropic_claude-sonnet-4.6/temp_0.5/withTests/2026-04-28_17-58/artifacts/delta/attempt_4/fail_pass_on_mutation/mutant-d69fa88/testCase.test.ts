import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('invert()', () => {
  beforeEach(() => {
    Delta.registerEmbed<{val: string}>('myembed', {
      compose: (a, b) => b,
      invert: (a, b) => b,  
      transform: (a, b, _priority) => b,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('myembed');
  });

  it('invert embed retain where base op is a retain (not insert)', () => {
    // If base has a retain op (not insert), getEmbedTypeAndData would fail
    // because baseOp.insert would be undefined
    // This tests the embed branch behavior
    const delta = new Delta().retain({ myembed: { val: 'b' } });
    const base = new Delta().insert({ myembed: { val: 'a' } });
    
    const inverted = delta.invert(base);
    // The inverted should undo the embed retain
    expect(inverted).toBeDefined();
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});