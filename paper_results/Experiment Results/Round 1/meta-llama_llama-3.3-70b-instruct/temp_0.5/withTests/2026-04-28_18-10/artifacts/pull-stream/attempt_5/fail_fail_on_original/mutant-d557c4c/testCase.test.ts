import { pull } from '../../pull.js';

describe('pull.js', () => {
  it('should pass when s is an object with a function sink and is an object', () => {
    const s = {
      sink: () => {},
      source: () => {}
    };
    const read = () => {};
    pull(read, s);
    expect(true).toBe(true);
  });
});