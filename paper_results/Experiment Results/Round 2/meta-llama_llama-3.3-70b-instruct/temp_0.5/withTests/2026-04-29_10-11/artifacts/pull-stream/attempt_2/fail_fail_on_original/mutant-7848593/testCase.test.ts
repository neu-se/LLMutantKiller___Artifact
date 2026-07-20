import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return a function that extracts a property from an object', () => {
    const data = { name: 'John', age: 30 };
    const getName = prop('name');
    expect(getName(data)).toBe('John');
  });

  it('should return a function that extracts a property from an object using a regexp', () => {
    const data = { foo: 'hello world' };
    const getHello = prop(/hello/);
    expect(getHello(data)).toBe('hello');
  });

  it('should return the key when it is not a string or a regexp', () => {
    const data = { foo: 'bar' };
    const getKey = prop({ foo: 'bar' });
    expect(getKey(data)).toBe({ foo: 'bar' });
  });

  it('should return undefined when the mutated code is used', () => {
    const data = { foo: 'bar' };
    const getHello = prop({ exec: '' });
    expect(getHello(data)).toBeUndefined();
  });
});