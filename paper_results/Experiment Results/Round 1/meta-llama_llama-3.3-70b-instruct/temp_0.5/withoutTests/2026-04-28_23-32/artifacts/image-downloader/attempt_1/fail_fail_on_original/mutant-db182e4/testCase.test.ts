import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import { promises as fs } from 'fs';

describe('image downloader', () => {
  it('should resolve relative paths correctly', async () => {
    // Arrange
    const url = 'https://example.com/image.jpg';
    const dest = './image.jpg';
    const options = { url, dest };

    // Act
    const result = await image(options);

    // Assert
    expect(result).not.toBeNull();
    await expect(fs.access(dest)).resolves.not.toThrow();
  });
});