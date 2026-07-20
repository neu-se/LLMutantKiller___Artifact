import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when no done callback is supplied', () => {
    expect(() => {
      const sink = drain(null, null);
      sink(null);
    }).toThrowError('no done callback supplied');
  });
});