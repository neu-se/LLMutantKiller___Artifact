import path from "path";

const mockFakeDest = 'fake-absolute/test.jpg';

jest.mock('path', () => {
  const actualPath = jest.requireActual<typeof path>('path');
  return {
    ...actualPath,
    isAbsolute: (p: string) => p === 'fake-absolute/test.jpg' ? true : actualPath.isAbsolute(p),
  };
});

const mockCalls: any[] = [];
jest.mock(
  "../../../../../../../../../../../subject_repositories/image-downloader/lib/request",
  () => (opts: any) => {
    mockCalls.push({ ...opts });
    return Promise.resolve({ filename: "test.jpg", image: Buffer.from("") });
  }
);

describe("image-downloader", () => {
  it("should not resolve dest path when path.isAbsolute returns true", async () => {
    const mod = require("../../../../../../../../../../../subject_repositories/image-downloader/index.js");
    
    await mod.image({ url: "http://example.com/test.jpg", dest: mockFakeDest, extractFilename: false });
    
    expect(mockCalls).toHaveLength(1);
    // Original: isAbsolute returns true, so dest stays as 'fake-absolute/test.jpg'
    // Mutated: always resolves, so dest becomes path.resolve(__dirname_of_index, 'fake-absolute/test.jpg')
    expect(mockCalls[0].dest).toBe(mockFakeDest);
  });
});