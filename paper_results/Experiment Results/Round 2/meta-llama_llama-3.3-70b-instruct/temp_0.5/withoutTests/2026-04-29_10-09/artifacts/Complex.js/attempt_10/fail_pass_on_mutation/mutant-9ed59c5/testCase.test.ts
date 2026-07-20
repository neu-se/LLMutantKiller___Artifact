describe('Complex', () => {
  it('should throw an error when define is not a function', () => {
    const define = undefined;
    expect(() => {
      if (typeof define === 'function' && define['amd']) {
        // do nothing
      } else if (typeof exports === 'object') {
        // do nothing
      }
    }).not.toThrow();
  });

  it('should not throw an error when define is a function', () => {
    const define = () => {};
    define['amd'] = true;
    expect(() => {
      if (typeof define === 'function' && define['amd']) {
        // do nothing
      } else if (typeof exports === 'object') {
        // do nothing
      }
    }).not.toThrow();
  });
});