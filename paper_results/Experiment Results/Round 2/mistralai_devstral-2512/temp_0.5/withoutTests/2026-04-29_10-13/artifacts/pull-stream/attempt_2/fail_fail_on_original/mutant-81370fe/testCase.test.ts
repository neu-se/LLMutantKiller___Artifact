const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe('pull function with object argument', () => {
  it('should handle object arguments correctly', () => {
    const source = {
      source: () => 'source',
      sink: (read: any) => {}
    };

    const obj = { some: 'object' };

    const result = pull(source, obj);

    expect(result).toBe('source');
  });
});