import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle object correctly', () => {
    const read = () => 'read';
    const s = { sink: jest.fn(), source: () => {} };
    const result = pull(read, s);
    expect(s.sink).toHaveBeenCalledTimes(0);
    expect(s.sink).not.toHaveBeenCalledWith(read);
  });
});