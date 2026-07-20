// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/image-downloader/attempt_1/pending_category/mutant-6954c2a/testCase.test.ts
import { createWriteStream } from 'fs';
import { TimeoutError } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/TimeoutError';
import { http, https } from 'follow-redirects';

const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');

describe('Error message validation', () => {
  it('should reject with a properly formatted error message for non-200 status codes', (done) => {
    const mockHttp = require('http');
    const originalGet = mockHttp.get;
    mockHttp.get = (url: string, options: any, callback: (res: any) => void) => {
      const mockRes = {
        statusCode: 404,
        resume: () => {},
        pipe: () => mockRes,
        on: () => mockRes,
        once: () => mockRes
      };
      callback(mockRes);
      return {
        on: () => {},
        once: () => {}
      };
    };

    download.image({ url: 'http://someurl.com/image-error.jpg', dest: '/tmp' })
      .then(() => done(new Error('Should throw an error')))
      .catch((err: Error) => {
        expect(err.message).toMatch('Request Failed.');
        expect(err.message).toMatch('Status Code: 404');
        done();
      });
  });
});