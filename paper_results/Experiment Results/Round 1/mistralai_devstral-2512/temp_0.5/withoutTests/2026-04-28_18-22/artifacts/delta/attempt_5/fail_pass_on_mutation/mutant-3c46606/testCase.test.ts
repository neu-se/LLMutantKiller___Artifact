import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embed handler', () => {
  it('should correctly handle embed transform when handler exists', () => {
    // Register a handler that returns a specific value
    const testHandler = {
      compose: jest.fn(),
      invert: jest.fn(),
      transform: jest.fn(() => 'transformed-value')
    };
    Delta.registerEmbed('test', testHandler);

    const delta1 = new Delta().retain({ test: 'original' });
    const delta2 = new Delta().retain({ test: 'other' });

    const result = delta1.transform(delta2, false);

    // In original code, handler.transform is called and returns 'transformed-value'
    // In mutated code, the handler check is bypassed so transform isn't called
    expect(result.ops[0].retain).toEqual({ test: 'transformed-value' });
    expect(testHandler.transform).toHaveBeenCalled();

    Delta.unregisterEmbed('test');
  });
});