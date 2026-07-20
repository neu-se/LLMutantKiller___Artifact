describe('once', () => {
  it('should call callback with value when value is not null and abort is false', () => {
    const once = require('../../../sources/once.js').once;
    const cb = jest.fn();
    const read = once('test', () => {});
    read(null, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 'test');
  });
});