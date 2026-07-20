import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform embed retain against embed retain uses handler and produces correct result', () => {
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => priority ? a : b,
    });

    // Both thisOp and otherOp are object retains - otherData IS an object
    // so ternary takes the ? branch (otherData), mutation doesn't affect this path
    // But if we make otherOp a number retain and thisOp an object retain:
    // otherData = number -> else branch -> original=false, mutated=true
    const a = new Delta().retain({ image: 'cat.png' });
    const b = new Delta().retain(1);
    // otherData=1 (number), else branch taken
    // original: transformedData=false -> retain(false) -> {retain:false}
    // mutated:  transformedData=true  -> retain(true)  -> {retain:true}
    const result = a.transform(b, true);
    const ops = result.ops;
    expect(ops.length).toBe(1);
    expect(ops[0].retain).toBe(1);

    Delta.unregisterEmbed('image');
  });
});