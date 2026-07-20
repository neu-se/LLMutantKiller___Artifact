import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta transform', () => {
  it('transform retain with object embed where otherData is object but thisData is number', () => {
    Delta.registerEmbed('img', {
      compose: (a: any, b: any) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
    });
    // a retains 1 (number), b retains embed object
    // In the else branch: thisData=1 (number), otherData={img:...} (object)
    // Original: typeof {img:...} === 'object' && !== null → true → otherData
    // Mutated: true → otherData
    // Same result! 
    const a = new Delta().retain(1);
    const b = new Delta().retain({ img: { src: 'x' } });
    const result = a.transform(b, false);
    Delta.unregisterEmbed('img');
    expect(result.ops).toEqual([{ retain: { img: { src: 'x' } } }]);
  });
});