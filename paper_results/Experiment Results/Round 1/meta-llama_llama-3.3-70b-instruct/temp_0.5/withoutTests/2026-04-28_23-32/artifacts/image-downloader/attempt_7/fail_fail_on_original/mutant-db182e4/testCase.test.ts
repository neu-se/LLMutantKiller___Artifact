import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import { promises as fs } from 'fs';

describe('image downloader', () => {
  it('should resolve relative paths correctly', async () => {
    // Arrange
    const url = 'https://example.com/image.jpg';
    const dest = './image.jpg';
    const options = { url, dest };

    // Act
    await image(options);

    // Assert
    await expect(fs.access(dest)).resolves.not.toThrow();
    await expect(fs.access(`${process.cwd()}/${dest}`)).resolves.not.toThrow();
  });
});