const infinite = require('./infinite');

describe('infinite', () => {
  it('should call cb with end when end is true', () => {
    const cb = jest.fn();
    const read = infinite(() => Math.random());
    read(true, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(true, undefined);
  });

  it('should call cb with value when end is false', () => {
    const cb = jest.fn();
    const read = infinite(() => Math.random());
    read(false, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, expect.any(Number));
  });
});