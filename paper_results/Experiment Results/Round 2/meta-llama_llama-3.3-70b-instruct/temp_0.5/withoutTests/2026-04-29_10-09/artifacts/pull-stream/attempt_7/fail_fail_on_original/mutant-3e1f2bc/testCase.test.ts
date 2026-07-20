import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle object correctly', () => {
    const read = () => 'read';
    const s = { sink: () => {}, source: () => {} };
    const result = pull(read, s);
    expect(s.sink).not.toHaveBeenCalled();
  });
});