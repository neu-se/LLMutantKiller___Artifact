import { image } from '../../../index';

describe('image downloader', () => {
  it('should resolve relative paths correctly', () => {
    const url = 'http://someurl.com/image.jpg';
    const dest = './test/fixtures/image.jpg';

    return image({ url, dest }).then(({ filename }) => {
      expect(filename).toEqual(path.resolve(__dirname, dest));
    });
  });
});