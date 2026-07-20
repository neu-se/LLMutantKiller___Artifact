import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('transform with object retain in this and numeric retain in other uses correct length', () => {
    // Register handler for embed type 'x'
    let handlerCallCount = 0;
    Delta.registerEmbed('x', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown, _priority: boolean) => {
        handlerCallCount++;
        return b;
      },
    });

    try {
      // this: [insert 'ab', retain {x: 1}] -- length 3
      // other: [retain 3] -- retains all 3
      // After transform:
      // 'ab' insert in this with priority=true: delta.retain(2)
      // then retain {x:1} in this vs retain 1 in other:
      //   thisData = {x:1}, otherData = 1
      //   transformedData = 1 (length, since otherData is number)
      //   Original: typeof {x:1} === 'object' && != null && typeof 1 === 'object' => false
      //   Mutated: typeof {x:1} === 'object' => true, enter block
      //     Object.keys({x:1})[0] = 'x', Object.keys(1)[0] = undefined
      //     'x' !== undefined => inner if fails
      //   Both: delta.retain(1)
      // Result should be [retain 3]
      const thisDelta = new Delta().insert('ab').retain({ x: 1 });
      const otherDelta = new Delta().retain(3);
      const result = thisDelta.transform(otherDelta, true);
      expect(result.ops).toEqual([{ retain: 3 }]);
      expect(handlerCallCount).toBe(0);
    } finally {
      Delta.unregisterEmbed('x');
    }
  });
});