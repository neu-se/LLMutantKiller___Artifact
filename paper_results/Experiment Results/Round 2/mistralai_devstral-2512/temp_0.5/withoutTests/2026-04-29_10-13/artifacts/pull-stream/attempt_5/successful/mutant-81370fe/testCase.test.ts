const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe('pull function with object argument', () => {
  it('should call sink on object arguments', () => {
    const source = {
      source: () => 'source',
      sink: (read: any) => {}
    };

    const sinkSpy = jest.fn();
    const obj = {
      sink: sinkSpy,
      source: () => 'object-source'
    };

    pull(source, obj);

    expect(sinkSpy).toHaveBeenCalled();
  });
});