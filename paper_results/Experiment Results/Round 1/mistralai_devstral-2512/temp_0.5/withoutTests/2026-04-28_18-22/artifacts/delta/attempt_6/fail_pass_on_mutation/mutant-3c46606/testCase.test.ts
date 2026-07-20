import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embed handler', () => {
  it('should use handler.transform when handler is registered', () => {
    const mockHandler = {
      compose: jest.fn(),
      invert: jest.fn(),
      transform: jest.fn((a, b, priority) => `${a}-${b}-${priority}`)
    };
    Delta.registerEmbed('custom', mockHandler);

    const delta1 = new Delta().retain({ custom: 'A' });
    const delta2 = new Delta().retain({ custom: 'B' });

    const result = delta1.transform(delta2, true);

    // Original code calls handler.transform and gets "A-B-true"
    // Mutated code skips handler check and doesn't call transform
    expect(result.ops[0].retain).toEqual({ custom: 'A-B-true' });
    expect(mockHandler.transform).toHaveBeenCalledWith('A', 'B', true);

    Delta.unregisterEmbed('custom');
  });
});