import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';

describe('Matcher', () => {
  it('should correctly compile a path with a single segment', () => {
    const matcher = new Matcher('/foo');
    expect(matcher.source).toBe('^\\/foo$');
  });

  it('should correctly compile a path with multiple segments', () => {
    const matcher = new Matcher('/foo/bar');
    expect(matcher.source).toBe('^\\/foo\\/bar$');
  });

  it.skip('should correctly compile a path with a wildcard segment', () => {
    const matcher = new Matcher('/foo/+');
    expect(matcher.source).toBe('^\\/foo\\/[^\\/]+$');
  });

  it.skip('should correctly compile a path with multiple wildcard segments', () => {
    const matcher = new Matcher('/foo/+/bar/+/baz');
    expect(matcher.source).toBe('^\\/foo\\/[^\\/]+\\/bar\\/[^\\/]+\\/baz$');
  });
});