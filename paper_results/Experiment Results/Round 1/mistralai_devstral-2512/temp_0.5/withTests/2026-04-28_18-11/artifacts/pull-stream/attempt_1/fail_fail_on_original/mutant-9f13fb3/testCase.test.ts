import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pull = require('../../../../../../../../../../../subject_repositories/pull-stream/pull.js');
const prop = require('../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js');

describe('prop function with string key', () => {
  it('should return a function that retrieves the value for the given string key', () => {
    const getName = prop('name');
    const data = { name: 'Alice', age: 30 };
    const result = getName(data);
    expect(result).toBe('Alice');
  });
});