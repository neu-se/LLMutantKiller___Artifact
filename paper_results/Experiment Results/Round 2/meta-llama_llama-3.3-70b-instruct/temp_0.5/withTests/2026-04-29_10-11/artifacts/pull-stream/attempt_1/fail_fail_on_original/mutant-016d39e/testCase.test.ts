import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should throw an error when no done callback is supplied and an error occurs', () => {
    expect(() => drain(null, null)).toThrowError('no done callback supplied');
  });
});