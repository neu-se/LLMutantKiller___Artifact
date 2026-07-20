import { pull } from '../pull.js';

describe('pull.js', () => {
  it('should pass when s is an object with a function sink', () => {
    const s = {
      sink: () => {},
      source: () => {}
    };
    expect(() => {
      pull(
        () => {},
        s
      );
    }).not.toThrowError();
  });
});