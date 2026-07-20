import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle object correctly', () => {
    const read = () => 'read';
    const s = (r: any) => r;
    const result = pull(read, s);
    expect(result).not.toThrow();
  });
});