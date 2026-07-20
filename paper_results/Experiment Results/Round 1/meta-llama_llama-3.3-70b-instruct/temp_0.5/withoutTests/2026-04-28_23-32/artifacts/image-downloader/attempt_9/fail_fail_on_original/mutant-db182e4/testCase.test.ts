import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import { promises as fs } from 'fs';

describe('image downloader', () => {
  it('should resolve relative paths correctly', async () => {
    // Arrange
    const url = 'https://example.com/image.jpg';
    const dest = './';
    const options = { url, dest };

    // Act
    await image(options);

    // Assert
    const absoluteDest = require('path').resolve(process.cwd(), 'image.jpg');
    await expect(fs.access(absoluteDest)).rejects.toThrow();
  });
});