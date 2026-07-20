import { download } from '../index';

describe('download an image with non-200 status code', () => {
  it('should throw an error with the status code', async () => {
    try {
      await download.image({ url: 'http://someurl.com/error', dest: '/tmp' });
      throw new Error('Expected an error to be thrown');
    } catch (error: any) {
      if (error.message === '') {
        throw new Error('Error message is empty');
      }
      if (!error.message.includes('Status Code:')) {
        throw new Error('Error message does not contain status code');
      }
    }
  });
});