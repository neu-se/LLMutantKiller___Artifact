import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform with null embed data', () => {
    Delta.registerEmbed('myEmbed', {
      compose: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
      invert: (a: any, b: any) => b,
    });

    // thisData = { myEmbed: null } - an object with null value
    const a = new Delta().retain({ myEmbed: null } as any);
    const b = new Delta().retain({ myEmbed: 'value' });
    
    // Both original and mutated: thisData !== null → true (it's an object)
    // Enter block, handler called with a = null, b = 'value'
    const result = a.transform(b, false);
    expect(result).toEqual(new Delta().retain({ myEmbed: 'value' }));

    Delta.unregisterEmbed('myEmbed');
  });
});