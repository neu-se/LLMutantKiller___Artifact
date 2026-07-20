import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher constructor version parameter', () => {
  it('should accept version 1.1 as valid version when explicitly provided', () => {
    const matcher = new Matcher('/test', '1.1');
    expect(matcher.spec).toBe('/test');
    expect(matcher.source).toBe('^\\/test$');
  });
});