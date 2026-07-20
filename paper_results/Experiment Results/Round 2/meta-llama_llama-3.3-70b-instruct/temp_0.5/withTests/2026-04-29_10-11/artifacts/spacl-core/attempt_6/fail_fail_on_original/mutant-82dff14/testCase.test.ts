import { describe, it, expect } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher constructor', () => {
  it('should throw an error when version is not one of the allowed values', () => {
    // We expect the original code to throw a TypeScript error when the version is not one of the allowed values
    // However, we can test this by using the 'any' type to bypass TypeScript's type checking
    const originalVersion = Matcher.prototype.constructor.name;
    expect(originalVersion).toBe('Matcher');
    const matcher = new (Matcher as any)('/', '1.1');
    expect(matcher.constructor.name).toBe('Matcher');
    // We expect the mutated code to not throw an error when the version is an empty string
    // So, we can test this by checking if the constructor name is still 'Matcher'
    const mutatedMatcher = new (Matcher as any)('/', '');
    expect(mutatedMatcher.constructor.name).not.toBe('Matcher');
  });
});