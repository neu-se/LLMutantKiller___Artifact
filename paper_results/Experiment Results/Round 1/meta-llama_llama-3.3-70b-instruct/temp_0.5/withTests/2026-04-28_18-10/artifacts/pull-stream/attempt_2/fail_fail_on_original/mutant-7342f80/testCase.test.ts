import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should not throw an error when a done callback is provided', () => {
    expect(() => drain(() => true, () => {})).not.toThrowError();
  });
});