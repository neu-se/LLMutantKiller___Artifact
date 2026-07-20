import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform embed retain against numeric retain produces correct result', () => {
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
    });

    const a = new Delta().retain({ image: 'http://example.com' });
    const b = new Delta().retain(1, { bold: true });
    // b has numeric retain=1, so otherData=1 (not object), else branch taken
    // Original: transformedData = false; retain(false, {bold:true}) -> {retain:false, attributes:{bold:true}}
    // Mutated:  transformedData = true;  retain(true, {bold:true})  -> {retain:true, attributes:{bold:true}}
    const result = a.transform(b, true);
    expect(result.ops[0].retain).toBe(1);

    Delta.unregisterEmbed('image');
  });
});