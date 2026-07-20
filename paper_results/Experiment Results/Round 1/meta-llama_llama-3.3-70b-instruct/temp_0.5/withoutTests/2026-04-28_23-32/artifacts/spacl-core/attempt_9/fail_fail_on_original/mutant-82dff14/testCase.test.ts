import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error when creating a new instance with an invalid version type', () => {
    expect(() => new Matcher('/path', '1.1')).not.toThrowError();
    // @ts-expect-error
    expect(() => {
      const matcher = new Matcher('/path', '1.1');
      // @ts-ignore
      matcher.version = '';
    }).toThrowError();
  });
});