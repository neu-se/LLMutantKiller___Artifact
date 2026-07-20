import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw a TypeScript error when creating a new instance with an invalid version', () => {
    // @ts-expect-error
    expect(() => new (class extends Matcher {
      constructor() {
        super('/path', '1.1' as any);
      }
    })()).not.toThrowError();
    // @ts-expect-error
    expect(() => new (class extends Matcher {
      constructor() {
        super('/path', '' as any);
      }
    })()).toThrowError();
  });
});