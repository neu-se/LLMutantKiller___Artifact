import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('invert()', () => {
  it('invert of numeric retain with attributes over embed base', () => {
    Delta.registerEmbed<string>('img', {
      compose: (a: string, b: string) => b,
      invert: (a: string, b: string) => b,
      transform: (a: string, b: string, priority: boolean) => b,
    });

    // delta: retain(1, {bold: true}) - numeric retain with attributes
    // base: insert({img: 'photo.png'}) - embed insert
    const delta = new Delta().retain(1, { bold: true });
    const base = new Delta().insert({ img: 'photo.png' });
    
    // Branch 3 handles this: numeric retain with attributes
    // forEach: op.retain && op.attributes = 1 && {bold:true} = true
    //          inverted.retain(1, AttributeMap.invert({bold:true}, undefined))
    //          = inverted.retain(1, {bold: null})
    const inverted = delta.invert(base);
    const expected = new Delta().retain(1, { bold: null });
    expect(inverted).toEqual(expected);
    
    Delta.unregisterEmbed('img');
  });
});