import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle object as a sink', () => {
    const read = () => {};
    const sink = { sink: () => {}, source: () => {} };
    const result = pull.default(read, sink);
    expect(result).toBe(sink.source);
  });
});