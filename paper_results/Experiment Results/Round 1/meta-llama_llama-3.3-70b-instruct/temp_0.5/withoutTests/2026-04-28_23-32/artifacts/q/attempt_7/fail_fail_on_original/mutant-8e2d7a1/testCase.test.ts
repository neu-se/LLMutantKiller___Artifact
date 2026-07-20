import { Q } from './q.js';

describe('Q', () => {
  it('should set a property on an object', () => {
    const obj = {};
    const promise = Q(obj).set('test', 'value');
    return promise.then(() => {
      expect(Object.keys(obj)).toContain('test');
    });
  });

  it('should throw an error when dispatching an empty string', () => {
    const obj = {};
    const promise = Q(obj).dispatch('', ['test', 'value']);
    return expect(promise).rejects.toThrow();
  });
});