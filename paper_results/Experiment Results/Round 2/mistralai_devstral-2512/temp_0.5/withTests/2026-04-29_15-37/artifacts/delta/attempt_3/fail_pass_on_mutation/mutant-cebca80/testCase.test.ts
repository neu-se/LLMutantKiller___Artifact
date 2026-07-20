import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() with object retain', () => {
  it('should correctly handle object retain operations', () => {
    Delta.registerEmbed<{ value: number }>('test', {
      compose: (a, b) => ({ value: a.value + b.value }),
      transform: (a, b, priority) => ({ value: priority ? a.value : b.value }),
      invert: (a, b) => ({ value: b.value - a.value }),
    });

    const base = new Delta().insert({ test: { value: 10 } });
    const delta = new Delta().retain({ test: { value: 5 } });
    const inverted = delta.invert(base);

    const expected = new Delta().retain({ test: { value: 5 } });
    expect(inverted.ops.length).toBe(1);
    expect(inverted.ops[0].retain).toEqual({ test: { value: 5 } });

    Delta.unregisterEmbed('test');
  });
});