import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should not throw an error when done callback is supplied', () => {
    const spy = jest.fn();
    const sink = drain(null, spy);
    expect(sink).not.toThrow();
  });
});