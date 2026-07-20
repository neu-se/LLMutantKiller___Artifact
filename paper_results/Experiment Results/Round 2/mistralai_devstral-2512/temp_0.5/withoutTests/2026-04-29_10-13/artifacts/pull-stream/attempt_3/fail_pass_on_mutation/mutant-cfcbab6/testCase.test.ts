import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with exactly one argument', () => {
  it('should return the read function when given only one argument', () => {
    const read = jest.fn();
    const result = pull(read);
    expect(result).toBe(read);
  });
});