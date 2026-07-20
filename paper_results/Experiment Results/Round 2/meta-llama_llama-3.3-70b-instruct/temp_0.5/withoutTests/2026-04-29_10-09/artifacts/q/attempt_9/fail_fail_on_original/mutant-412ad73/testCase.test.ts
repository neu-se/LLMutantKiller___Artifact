describe('Q Promise Library', () => {
  it('should throw an error when trying to use the Q library', () => {
    const Q = require('./q');
    expect(() => Q()).toThrowError();
  });
});