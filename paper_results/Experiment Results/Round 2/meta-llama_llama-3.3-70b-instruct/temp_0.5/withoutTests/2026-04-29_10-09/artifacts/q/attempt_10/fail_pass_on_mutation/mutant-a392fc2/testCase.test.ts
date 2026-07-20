describe('Q', () => {
  it('calls the callback when it is a function in finally', () => {
    const Q = function() {
      return {
        finally: function(callback) {
          if (typeof callback !== 'function') {
            throw new Error('Q can\'t apply finally callback');
          }
          callback();
        }
      }
    }
    const callback = jest.fn();
    Q().finally(callback);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});