import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should throw an error when no done callback is provided', () => {
    expect(() => drain(() => true)).toThrowError('no done callback supplied');
  });
});