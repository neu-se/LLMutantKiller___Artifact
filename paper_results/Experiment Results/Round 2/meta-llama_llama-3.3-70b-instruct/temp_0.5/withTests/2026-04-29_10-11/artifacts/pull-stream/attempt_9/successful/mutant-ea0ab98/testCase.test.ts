describe('prop function', () => {
  it('should return a function that extracts a match from a string using a regexp', () => {
    const data = 'Hello, world!';
    const regexp = /world/;
    const extractor = (function prop(key) {
      return key && (
        'string' == typeof key
        ? function (data) { return data[key] }
        : 'object' === typeof key && 'function' === typeof key.exec 
        ? function (data) { var v = key.exec(data); return v && v[0] }
        : key
      )
    })(regexp);
    const result = extractor(data);
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(typeof result).toBe('string');
  });
});