import { pull } from '../../pull.js';

describe('pull.js', () => {
  it('should pass when s is an object and fail when s is not an object', () => {
    const s = {
      sink: () => {},
      source: () => {}
    };
    const read = () => {};
    expect(() => {
      pull(read, s);
    }).not.toThrowError();

    const notAnObject = 'string';
    expect(() => {
      pull(read, notAnObject);
    }).toThrowError();
  });
});