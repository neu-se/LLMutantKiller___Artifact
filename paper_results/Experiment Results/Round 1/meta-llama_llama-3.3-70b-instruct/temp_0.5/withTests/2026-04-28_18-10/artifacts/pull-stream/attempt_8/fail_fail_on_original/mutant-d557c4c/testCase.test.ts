import pull from '../pull.js';

describe('pull.js', () => {
  it('should pass when s is an object with a function sink and source', () => {
    const s = {
      sink: () => {},
      source: () => {}
    };
    const read = () => {};
    expect(() => {
      if (s && typeof s === 'object' && typeof s.sink === 'function' && typeof s.source === 'function') {
        pull(read, s);
      } else {
        throw new Error('s is not a valid object');
      }
    }).not.toThrowError();
  });
});