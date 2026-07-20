import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import { promises as fs } from 'fs';
import { tmpdir } from 'os';

describe('image downloader', () => {
  it('should resolve relative paths correctly', async () => {
    // Arrange
    const url = 'https://example.com/image.jpg';
    const dest = './test.jpg';
    const options = { url, dest };

    // Act
    await image(options);

    // Assert
    const absoluteDest = require('path').resolve(process.cwd(), dest);
    await expect(fs.access(absoluteDest)).resolves.not.toThrow();
  });
});