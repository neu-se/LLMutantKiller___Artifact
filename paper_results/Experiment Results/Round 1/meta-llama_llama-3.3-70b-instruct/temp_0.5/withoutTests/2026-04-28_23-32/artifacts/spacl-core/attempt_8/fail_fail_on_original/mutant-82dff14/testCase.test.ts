import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error when creating a new instance with an invalid version type', () => {
    // @ts-expect-error
    expect(() => new Matcher('/path', '1.1' as any)).not.toThrowError();
    // @ts-expect-error
    expect(() => new Matcher('/path', '' as any)).toThrowError();
  });
});