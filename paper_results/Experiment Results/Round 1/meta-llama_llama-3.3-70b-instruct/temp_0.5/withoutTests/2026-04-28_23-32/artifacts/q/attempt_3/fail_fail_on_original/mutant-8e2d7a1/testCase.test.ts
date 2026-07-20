import { Q } from '../../../q.js';

describe('Q', () => {
  it('should set a property on an object', () => {
    const obj = {};
    const promise = Q(obj).set('test', 'value');
    return promise.then(() => {
      expect(obj).toHaveProperty('test', 'value');
    });
  });

  it('should dispatch the set operation correctly', () => {
    const obj = {};
    const promise = Q(obj).dispatch('set', ['test', 'value']);
    return promise.then((result) => {
      expect(result).toBeUndefined();
      expect(obj).toHaveProperty('test', 'value');
    });
  });
});