import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transform with embed handler and same embed types, checking for handler usage with condition', () => {
    let handlerCalled = false;
    Delta.registerEmbed('test', {
      compose: (a, b) => a,
      transform: (a, b, priority) => { 
        if (priority) {
          handlerCalled = true;
        }
        return b; 
      },
      invert: (a, b) => a,
    });
    const deltaA = new Delta().retain({ test: 'a' });
    const deltaB = new Delta().retain({ test: 'b' });
    const result = deltaA.transform(deltaB, true);
    expect(handlerCalled).toBe(true);
    Delta.unregisterEmbed('test');
  });
});