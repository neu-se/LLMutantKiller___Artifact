const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe('pull function with object argument', () => {
  it('should handle object arguments with sink and source properties', () => {
    const source = {
      source: () => 'original-source',
      sink: (read: any) => {}
    };

    const through = {
      source: (read: any) => 'through-source',
      sink: (read: any) => {}
    };

    const result = pull(source, through);

    expect(result).toBe('through-source');
  });
});