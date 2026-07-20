import { describe, it, expect } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should throw an error when version is not one of the allowed values or undefined', () => {
    expect(() => new Matcher('/foo', '1.1')).not.toThrowError();
    expect(() => new Matcher('/foo', '1')).not.toThrowError();
    expect(() => new Matcher('/foo', '1.0')).not.toThrowError();
    expect(() => new Matcher('/foo', undefined)).not.toThrowError();
    expect(() => {
      // @ts-ignore
      new Matcher('/foo', '2');
    }).toThrowError();
  });
});