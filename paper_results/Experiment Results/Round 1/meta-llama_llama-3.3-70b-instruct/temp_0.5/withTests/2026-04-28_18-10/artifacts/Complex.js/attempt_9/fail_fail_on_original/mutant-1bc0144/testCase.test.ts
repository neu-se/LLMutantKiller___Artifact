describe('Complex', () => {
  it('should throw an error when trying to access a non-existent property in the asec method', () => {
    const complex = {
      re: 1,
      im: 2,
      asec: function() {
        var a = this["re"];
      }
    };
    const mutatedComplex = {
      re: 1,
      im: 2,
      asec: function() {
        var a = this[""];
      }
    };
    expect(() => mutatedComplex.asec()).toThrowError();
  });
});