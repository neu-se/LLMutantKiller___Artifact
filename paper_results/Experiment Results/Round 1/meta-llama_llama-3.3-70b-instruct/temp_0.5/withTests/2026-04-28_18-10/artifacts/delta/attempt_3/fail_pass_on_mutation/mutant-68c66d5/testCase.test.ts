import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly register and unregister embed handlers', () => {
    const handler = {
      compose: (a, b) => a,
      transform: (a, b) => a,
      invert: (a, b) => a,
    };
    Delta.registerEmbed('test', handler);
    expect(Delta.getHandler('test')).toBe(handler);
    Delta.unregisterEmbed('test');
    expect(() => Delta.getHandler('test')).toThrowError('no handlers for embed type "test"');
  });
});