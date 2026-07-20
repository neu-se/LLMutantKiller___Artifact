import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";

describe('Error handling for missing URL', () => {
  it('should reject with a specific error message when options.url is missing', () => {
    return expect(image({ dest: '/tmp' })).rejects.toThrow('The options.url is required');
  });
});