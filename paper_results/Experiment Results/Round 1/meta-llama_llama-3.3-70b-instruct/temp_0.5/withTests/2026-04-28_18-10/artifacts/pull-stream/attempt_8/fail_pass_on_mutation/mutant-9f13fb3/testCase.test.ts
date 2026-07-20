describe('prop function', () => {
  it('should return a function that returns the value of a property when the key is a string', () => {
    const obj = { foo: 'bar' };
    const key = 'foo';
    const propFunc = (key && typeof key === 'string')? 
      (data: any) => data[key] : 
      (key instanceof RegExp)? 
        (data: any) => {
          const match = key.exec(data);
          return match && match[0];
        } : 
        key;
    expect(propFunc(obj)).toBe('bar');
  });

  it.skip('should return undefined when the key is not a string and not a regexp', () => {
    const obj = { foo: 'bar' };
    const key = false;
    const propFunc = (key && typeof key === 'string')? 
      (data: any) => data[key] : 
      (key instanceof RegExp)? 
        (data: any) => {
          const match = key.exec(data);
          return match && match[0];
        } : 
        key;
    expect(propFunc(obj)).toBe(false);
  });
});