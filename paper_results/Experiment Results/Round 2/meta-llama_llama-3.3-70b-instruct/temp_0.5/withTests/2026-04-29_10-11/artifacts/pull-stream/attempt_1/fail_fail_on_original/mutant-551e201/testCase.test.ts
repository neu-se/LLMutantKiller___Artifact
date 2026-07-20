import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should throw an error when end is not true and done callback is not provided', () => {
    const read = drain(null, null);
    const end = new Error('Test error');
    expect(() => read(null, (end, data) => {
      if (end && end !== true) {
        throw end;
      }
    })).toThrow(end);
  });
});