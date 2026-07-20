import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transform with embed handler and same embed types, checking for correct handler usage', () => {
    let handlerCalled = false;
    Delta.registerEmbed('test', {
      compose: (a, b) => a,
      transform: (a, b, priority) => { handlerCalled = true; return b; },
      invert: (a, b) => a,
    });
    const deltaA = new Delta().retain({ test: 'a' });
    const deltaB = new Delta().retain({ other: 'b' });
    expect(() => deltaA.transform(deltaB)).toThrowError('embed types not matched: test!= other');
    expect(handlerCalled).toBe(false);
    Delta.unregisterEmbed('test');
  });
});