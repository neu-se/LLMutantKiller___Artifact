import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embed handler', () => {
  it('should use handler when available for embed transform', () => {
    // Register a test handler
    const testHandler = {
      compose: jest.fn((a, b, keepNull) => b),
      invert: jest.fn((a, b) => a),
      transform: jest.fn((a, b, priority) => priority ? a : b)
    };
    Delta.registerEmbed('test', testHandler);

    // Create deltas with matching embed types
    const delta1 = new Delta().retain({ test: 'original' });
    const delta2 = new Delta().retain({ test: 'other' });

    // Transform with priority true
    const result = delta1.transform(delta2, true);

    // In original code, handler.transform should be called and return 'original'
    // In mutated code, handler.transform won't be called (if condition always true)
    expect(result.ops[0].retain).toEqual({ test: 'original' });

    // Verify handler was actually called
    expect(testHandler.transform).toHaveBeenCalledWith('original', 'other', true);

    Delta.unregisterEmbed('test');
  });
});