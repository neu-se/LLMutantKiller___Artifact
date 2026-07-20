import { describe, it, expect } from '@jest/globals';
import prop from '../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js';

describe('prop with regexp key', () => {
  it('should return a function that executes the regexp on data when given a regexp key', () => {
    const regexp = /hello/;
    const result = prop(regexp);

    // In the original code, prop(regexp) returns a function that runs regexp.exec(data)
    // In the mutated code, the regexp branch returns false, so it falls to `: key`,
    // returning the regexp itself (not a function wrapping exec)
    expect(typeof result).toBe('function');

    // The returned function should execute the regexp on data
    const match = result('hello world');
    expect(match).toBe('hello');

    const noMatch = result('goodbye world');
    expect(noMatch).toBeFalsy();
  });
});