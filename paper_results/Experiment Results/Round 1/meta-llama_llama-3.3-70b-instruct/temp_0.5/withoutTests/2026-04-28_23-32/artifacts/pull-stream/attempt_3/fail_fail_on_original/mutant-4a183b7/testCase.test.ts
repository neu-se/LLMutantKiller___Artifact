import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull-stream', () => {
  it('should call source function when available', () => {
    const source = jest.fn(() => ({ source: null }));
    const read = { source };
    const result = pull(read, () => read);
    expect(source).toHaveBeenCalledTimes(1);
  })
})