import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should not call Object.keys on non-object retain values', () => {
    const originalObjectKeys = Object.keys;
    const calls: unknown[] = [];
    jest.spyOn(Object, 'keys').mockImplementation((obj) => {
      calls.push(obj);
      return originalObjectKeys(obj);
    });

    Delta.registerEmbed('image', {
      compose: (_a: unknown, b: unknown) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown) => b,
    });

    const thisDelta = new Delta().retain({ image: { id: 1 } });
    const otherDelta = new Delta().retain(3);
    thisDelta.transform(otherDelta, false);

    // Original: Object.keys should NOT be called with a number
    // Mutated: Object.keys IS called with a number (3)
    const calledWithNumber = calls.some(c => typeof c === 'number');
    expect(calledWithNumber).toBe(false);

    jest.restoreAllMocks();
    Delta.unregisterEmbed('image');
  });
});