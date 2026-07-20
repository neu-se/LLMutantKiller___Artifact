import { describe, it, expect } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher constructor', () => {
  it('should throw an error when version is an empty string', () => {
    // We expect the original code to throw an error when the version is an empty string
    // because TypeScript will prevent this code from compiling
    // However, we can test this by using the 'any' type to bypass TypeScript's type checking
    const matcher = (Matcher as any).for('/', '');
    expect(() => new matcher.constructor('/', '')).toThrowError();
  });
});