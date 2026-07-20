import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should register and unregister embed handlers correctly', () => {
    const handler = {
      compose: (a: any, b: any, keepNull: boolean) => a,
      invert: (a: any, b: any) => a,
      transform: (a: any, b: any, priority: boolean) => a,
    };
    Delta.registerEmbed('test', handler);
    expect(Delta.handlers['test']).toBeDefined();
    Delta.unregisterEmbed('test');
    expect(Delta.handlers['test']).toBeUndefined();
    expect(typeof Delta.registerEmbed).toBe('function');
    expect(typeof Delta.unregisterEmbed).toBe('function');
  });
});