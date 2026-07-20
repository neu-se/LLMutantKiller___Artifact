describe('Q', () => {
  it('should return the fulfillment value of a promise when it is fulfilled', () => {
    const Q = require('../../../../../../../../subject_repositories/q/q');
    const promise = Q.resolve('fulfilled value');
    const inspected = promise.inspect();
    if (inspected.state === 'fulfilled') {
      expect(Q.nearer(promise)).toBe(inspected.value);
    } else {
      expect(false).toBe(true);
    }
  });
});