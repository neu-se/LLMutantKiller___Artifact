import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform embed against embed with priority calls handler', () => {
    const transformFn = jest.fn((a: unknown[], b: unknown[], priority: boolean) => {
      return priority ? b : [...b, ...a];
    });
    
    Delta.registerEmbed('delta', {
      compose: (a: unknown[], b: unknown[]) => [...a, ...b],
      transform: transformFn,
      invert: (a: unknown[], b: unknown[]) => b,
    });

    const a = new Delta().retain({ delta: ['a'] });
    const b = new Delta().retain({ delta: ['b'] });
    
    const result = a.transform(b, true);
    
    Delta.unregisterEmbed('delta');
    
    // Original: typeof { delta: ['a'] } === 'object' && { delta: ['a'] } !== null && { delta: ['b'] } !== null
    //   → true → enter block → handler called
    // Mutated: true && { delta: ['b'] } !== null → true → enter block → handler called
    // Both call the handler. Same result.
    expect(transformFn).toHaveBeenCalledTimes(1);
    expect(result).toEqual(new Delta().retain({ delta: ['b'] }));
  });
});