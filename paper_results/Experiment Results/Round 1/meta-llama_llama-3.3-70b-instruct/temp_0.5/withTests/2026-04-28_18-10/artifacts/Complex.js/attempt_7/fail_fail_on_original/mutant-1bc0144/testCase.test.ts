describe('Complex', () => {
  it('should throw an error when trying to access a non-existent property in the asec method', () => {
    const complex = new (function() {
      this.re = 1;
      this.im = 2;
      this.asec = function() {
        var a = this[""];
      };
    })();
    expect(() => complex.asec()).toThrowError(TypeError);
  });
});