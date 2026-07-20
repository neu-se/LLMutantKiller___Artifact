import pull from '../pull.js';

describe('pull.js', () => {
  it('should pass when s is an object with a function sink and source', () => {
    const s = {
      sink: () => {},
      source: () => {}
    };
    const read = () => {};
    pull(read, s);
    expect(true).toBe(true);
  });

  it('should fail when s is not an object', () => {
    const s = 'string';
    const read = () => {};
    expect(() => {
      pull(read, s);
    }).toThrowError();
  });
});