import { describe, it } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('detects mutation in path validation', () => {
    expect(() => new Matcher('/foo')).not.toThrow();
    expect(() => new Matcher('/foo/')).toThrow();
  });
});