import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error when creating a new instance with an invalid version type', () => {
    expect(() => {
      // @ts-expect-error
      new Matcher('/path', undefined as any);
    }).toThrowError();
  });
});