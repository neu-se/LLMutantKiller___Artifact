import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return a function that extracts a property from an object', () => {
    const data = { name: 'John', age: 30 };
    const getName = prop('name');
    expect(getName(data)).toBe('John');
  });

  it('should return a function that extracts a match from a string using a regexp', () => {
    const data = 'hello world';
    const getHello = prop(/hello/);
    expect(getHello(data)).toBe('hello');
  });

  it('should return the key when it is not a string or a regexp', () => {
    const data = { foo: 'bar' };
    const getKey = prop({ foo: 'bar' });
    expect(getKey(data)).toBe({ foo: 'bar' });
  });

  it('should throw an error when the mutated code is used', () => {
    const data = 'hello world';
    const getHello = prop({ exec: '' });
    expect(() => getHello(data)).toThrowError();
  });
});