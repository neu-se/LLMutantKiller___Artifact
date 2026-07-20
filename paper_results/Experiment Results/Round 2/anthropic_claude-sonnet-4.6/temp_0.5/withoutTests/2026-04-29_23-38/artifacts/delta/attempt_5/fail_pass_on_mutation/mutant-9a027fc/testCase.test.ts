import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('transform with embed retain operations using handler', () => {
    Delta.registerEmbed('formula', {
      compose: (a: any, b: any, keepNull: boolean) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => priority ? a : b,
    });

    const a = new Delta().retain({ formula: { value: 'x^2' } });
    const b = new Delta().retain({ formula: { value: 'y^2' } });
    
    // Both are object retains of same type
    // transformedData initially = otherData (both agree)
    // Handler runs: transform({value:'x^2'}, {value:'y^2'}, false) = {value:'y^2'}
    // transformedData = {formula: {value:'y^2'}}
    
    const result = a.transform(b, false);
    expect(result.ops).toEqual([{ retain: { formula: { value: 'y^2' } } }]);
    
    Delta.unregisterEmbed('formula');
  });
});