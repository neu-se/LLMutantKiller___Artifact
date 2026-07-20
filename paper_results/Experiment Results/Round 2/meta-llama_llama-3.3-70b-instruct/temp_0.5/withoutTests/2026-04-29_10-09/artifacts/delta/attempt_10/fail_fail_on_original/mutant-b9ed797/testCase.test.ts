import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle the push operation when index equals ops length', () => {
    const delta = new Delta();
    delta.ops = [{ insert: 'Hello' }];
    let called = false;
    const originalPush = delta.ops.push;
    delta.ops.push = function() {
      called = true;
      originalPush.apply(delta.ops, arguments);
    };
    delta.push({ insert: ' World' });
    expect(called).toBe(true);
  });
});