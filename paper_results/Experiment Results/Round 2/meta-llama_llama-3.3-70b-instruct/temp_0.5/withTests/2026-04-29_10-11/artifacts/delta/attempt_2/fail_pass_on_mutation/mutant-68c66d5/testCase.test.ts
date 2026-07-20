import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should register and unregister embed handlers correctly', () => {
    const handler = {
      compose: (a, b, keepNull) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => a,
    };
    Delta.registerEmbed('test', handler);
    expect(Delta.handlers['test']).toBeDefined();
    Delta.unregisterEmbed('test');
    expect(Delta.handlers['test']).toBeUndefined();
  });
});