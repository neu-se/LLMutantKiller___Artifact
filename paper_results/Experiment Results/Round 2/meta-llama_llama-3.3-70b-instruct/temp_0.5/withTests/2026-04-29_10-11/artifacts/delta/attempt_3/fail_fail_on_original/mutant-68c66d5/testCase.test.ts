import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should export the Delta class and its methods', () => {
    const delta = new Delta();
    expect(delta).toBeDefined();
    expect(typeof delta).toBe('object');
    expect(delta.constructor.name).toBe('Delta');
    expect(typeof delta.registerEmbed).toBe('function');
    expect(typeof delta.unregisterEmbed).toBe('function');
    delta.registerEmbed('test', {
      compose: (a, b, keepNull) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => a,
    });
    expect(delta.handlers).toBeDefined();
    expect(delta.handlers['test']).toBeDefined();
  });
});