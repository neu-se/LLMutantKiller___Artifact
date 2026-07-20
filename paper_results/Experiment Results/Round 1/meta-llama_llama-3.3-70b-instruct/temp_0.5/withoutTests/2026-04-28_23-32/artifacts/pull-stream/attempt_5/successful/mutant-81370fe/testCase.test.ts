import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle object arguments correctly', () => {
    const read = () => {};
    const obj = { sink: (f: () => void) => f(), source: () => {} };
    const result = pull(read, obj);
    expect(result).not.toBe(read);
  });
});