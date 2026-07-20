import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should call the source function when read.source is a function', () => {
    const read = {
      source: jest.fn(() => 'source called'),
    };
    const result = pull(read);
    expect(read.source).toHaveBeenCalledTimes(1);
  });
});