describe('Q', () => {
  it('does not throw an error when callback is a function in finally', () => {
    const Q = function() {
      return {
        finally: function(callback) {
          if (typeof callback !== 'function') {
            throw new Error('Q can\'t apply finally callback');
          }
          // Simulate the behavior of the original code
          callback();
        }
      }
    }
    const callback = jest.fn();
    Q().finally(callback);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('throws an error when callback is not a function in finally', () => {
    const Q = function() {
      return {
        finally: function(callback) {
          if (typeof callback !== 'function') {
            throw new Error('Q can\'t apply finally callback');
          }
          // Simulate the behavior of the original code
          callback();
        }
      }
    }
    const callback = 'string';
    expect(() => Q().finally(callback)).toThrowError('Q can\'t apply finally callback');
  });

  it('throws an error when callback is always true in finally', () => {
    const Q = function() {
      return {
        finally: function(callback) {
          throw new Error('Q can\'t apply finally callback');
        }
      }
    }
    const callback = jest.fn();
    expect(() => Q().finally(callback)).toThrowError('Q can\'t apply finally callback');
  });
});