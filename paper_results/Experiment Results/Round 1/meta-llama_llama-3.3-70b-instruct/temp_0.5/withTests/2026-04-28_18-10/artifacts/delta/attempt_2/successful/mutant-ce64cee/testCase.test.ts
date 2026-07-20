import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('unregisterEmbed', () => {
  it('should remove the handler when unregisterEmbed is called', () => {
    Delta.registerEmbed('test', {
      compose: () => {},
      transform: () => {},
      invert: () => {},
    });
    const originalHandler = Delta.handlers['test'];
    Delta.unregisterEmbed('test');
    expect(Delta.handlers['test']).toBeUndefined();
    Delta.registerEmbed('test', originalHandler);
    Delta.unregisterEmbed = () => {};
    Delta.unregisterEmbed('test');
    expect(Delta.handlers['test']).toBeDefined();
  });
});