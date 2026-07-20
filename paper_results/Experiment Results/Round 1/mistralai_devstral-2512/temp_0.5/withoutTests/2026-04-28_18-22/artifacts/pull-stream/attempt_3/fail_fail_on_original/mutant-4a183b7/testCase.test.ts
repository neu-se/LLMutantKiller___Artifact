const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe('pull function behavior with source property', () => {
  it('should use read.source when available', () => {
    const source = jest.fn(() => 'source-value');
    const read = { source };
    const result = pull(read);
    expect(result).toBe('source-value');
    expect(source).toHaveBeenCalled();
  });
});