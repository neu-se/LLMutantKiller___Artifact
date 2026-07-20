import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function behavior with object streams', () => {
  it('should correctly handle object streams with source and sink methods', () => {
    const source = {
      source: () => 'original-source',
      sink: () => {}
    };

    const result = pull(source);

    expect(result).toBe('original-source');
  });
});