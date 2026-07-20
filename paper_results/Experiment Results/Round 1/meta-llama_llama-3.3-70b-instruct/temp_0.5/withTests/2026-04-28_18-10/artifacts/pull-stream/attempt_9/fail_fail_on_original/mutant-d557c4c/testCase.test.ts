import pull from '../../../pull.js';

describe('pull.js', () => {
  it('should pass when s is an object with a function sink and source and fail when s is not a valid object', () => {
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

    const notValidObject = { foo: 'bar' };
    expect(() => {
      if (notValidObject && typeof notValidObject === 'object' && typeof notValidObject.sink === 'function' && typeof notValidObject.source === 'function') {
        pull(read, notValidObject);
      } else {
        throw new Error('notValidObject is not a valid object');
      }
    }).toThrowError();
  });
});