import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should call the source function when read.source is a function', () => {
    const read = {
      source: () => 'source called',
    };
    const result = pull(read);
    expect(result).toBe('source called');
  });
});