import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull-stream', () => {
  it('should call source function when available', () => {
    const source = jest.fn(() => ({ source: null }));
    const read = { source };
    pull(read, () => read);
    expect(read.source).toBeNull();
  })
})