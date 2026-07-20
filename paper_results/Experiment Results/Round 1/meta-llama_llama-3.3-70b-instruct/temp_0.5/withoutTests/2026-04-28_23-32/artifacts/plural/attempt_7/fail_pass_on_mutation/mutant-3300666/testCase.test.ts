import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('returns the correct plural form of a word', () => {
    const initialPlural = plural('cat', 2);
    plural.addRule('cat', 'kittens');
    const updatedPlural = plural('cat', 2);
    expect(initialPlural).not.toBe(updatedPlural);
  });
});