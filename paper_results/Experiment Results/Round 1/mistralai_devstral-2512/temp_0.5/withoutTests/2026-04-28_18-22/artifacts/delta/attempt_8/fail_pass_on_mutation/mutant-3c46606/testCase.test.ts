import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embed handler', () => {
  it('should use registered handler for embed transform', () => {
    // Register a handler that returns a specific transformation
    const testHandler = {
      compose: jest.fn(),
      invert: jest.fn(),
      transform: jest.fn((a, b, priority) => priority ? a : b)
    };
    Delta.registerEmbed('test', testHandler);

    const delta1 = new Delta().retain({ test: 'A' });
    const delta2 = new Delta().retain({ test: 'B' });

    // Transform with priority=true should return 'A'
    const result = delta1.transform(delta2, true);

    // Original code calls handler.transform and gets 'A'
    // Mutated code skips handler check and doesn't call transform
    expect(result.ops[0].retain).toEqual({ test: 'A' });
    expect(testHandler.transform).toHaveBeenCalledWith('A', 'B', true);

    Delta.unregisterEmbed('test');
  });
});