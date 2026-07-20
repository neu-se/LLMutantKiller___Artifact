import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle non-function arguments correctly', () => {
    const read = () => {};
    const sink = { source: () => {} };
    const result = pull(read, sink);
    expect(result).toBe(sink.source);
  });
});