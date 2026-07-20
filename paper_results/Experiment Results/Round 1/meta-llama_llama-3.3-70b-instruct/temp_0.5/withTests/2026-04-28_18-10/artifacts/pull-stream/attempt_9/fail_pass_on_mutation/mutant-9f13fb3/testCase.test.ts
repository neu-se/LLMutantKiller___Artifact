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

  it('should return the value of the property when the key is a string and the condition is true', () => {
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
});