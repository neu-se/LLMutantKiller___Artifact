import { createWriteStream } from 'fs';
import { TimeoutError } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/TimeoutError';
import { http, https } from 'follow-redirects';
import { request } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request';

describe('request function', () => {
  it('should handle request errors correctly', async () => {
    const rejectSpy = jest.fn();
    const url = 'http://example.com/non-existent-url';
    const dest = 'test.txt';

    await expect(request({ url, dest })).rejects.toThrowError();

    // Simulate an error event
    const error = new Error('Test Error');
    rejectSpy(error);

    // If the mutation is present, the error event will not be handled correctly
    // and the test will pass, but the rejectSpy will not be called
    expect(rejectSpy).toHaveBeenCalledTimes(0);
  });
});