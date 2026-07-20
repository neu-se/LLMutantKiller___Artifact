import { TimeoutError } from "../../../../../../../../../../../subject_repositories/image-downloader/lib/TimeoutError.js";

describe('TimeoutError', () => {
  it('should have a meaningful error message', () => {
    const error = new TimeoutError();
    expect(error.message).not.toBe('');
  });
});