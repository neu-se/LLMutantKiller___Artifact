import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";

describe('image downloader', () => {
  it('should reject with a meaningful error message when url is missing', () => {
    return image({ dest: '/tmp' })
      .catch((error) => {
        expect(error.message).not.toBeNull();
        expect(error.message).not.toBe('');
      });
  });
});