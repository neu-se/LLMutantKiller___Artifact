import { TimeoutError } from "../../../../../../../../../../../subject_repositories/image-downloader/lib/TimeoutError.js"

describe('TimeoutError', () => {
  it('should have message "TimeoutError"', () => {
    const error = new TimeoutError();
    expect(error.message).toBe('TimeoutError');
  });
});