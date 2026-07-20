import { pull } from '../pull.js';

describe('pull.js', () => {
  it('should pass when s is an object with a function sink and source and is checked as an object', () => {
    const s = {
      sink: () => {},
      source: () => {}
    };
    const read = () => {};
    expect(() => {
      if (s && typeof s === 'object') {
        pull(read, s);
      } else {
        throw new Error('s is not an object');
      }
    }).not.toThrowError();
  });
});