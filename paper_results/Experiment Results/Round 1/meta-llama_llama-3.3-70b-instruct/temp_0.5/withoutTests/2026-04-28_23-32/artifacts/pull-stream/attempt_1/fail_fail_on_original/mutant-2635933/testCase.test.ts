import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle object as a sink', () => {
    const read = () => ({});
    const sink = { sink: (read) => read, source: () => {} };
    const result = pull(read, sink);
    expect(result).toBe(sink.source);
  });
});