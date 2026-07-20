import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('Delta transform with embed handler', () => {
  it('should correctly transform embed data when handler is registered', () => {
    // Setup a custom embed handler
    const testHandler = {
      compose: jest.fn((a, b, keepNull) => b),
      invert: jest.fn((a, b) => a),
      transform: jest.fn((a, b, priority) => priority ? a : b)
    };
    Delta.registerEmbed('test', testHandler);

    // Create deltas with embed data
    const delta1 = new Delta().retain({ test: 'data1' });
    const delta2 = new Delta().retain({ test: 'data2' });

    // Transform should use the handler
    const result = delta1.transform(delta2, true);

    // Verify the handler was called
    expect(testHandler.transform).toHaveBeenCalledWith('data1', 'data2', true);

    // Verify the result contains transformed data
    const ops = result.ops;
    expect(ops.length).toBe(1);
    expect(ops[0].retain).toEqual({ test: 'data1' });

    // Clean up
    Delta.unregisterEmbed('test');
  });
});