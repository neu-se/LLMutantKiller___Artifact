import path from "path";

// Override path.isAbsolute to return true for our test path
// This makes the original skip path.resolve, but mutated always calls it
// Since path.resolve(__dirname, 'relative/path') !== 'relative/path', we can detect the mutation!

describe("image-downloader", () => {
  it("should not resolve dest when path.isAbsolute returns true", async () => {
    jest.resetModules();
    
    // Mock path to make isAbsolute return true for our relative path
    const originalPath = jest.requireActual('path') as typeof path;
    jest.mock('path', () => ({
      ...originalPath,
      isAbsolute: (p: string) => p === 'fake-absolute/test.jpg' ? true : originalPath.isAbsolute(p),
    }));
    
    const calls: any[] = [];
    jest.mock(
      "../../../../../../../../../../../subject_repositories/image-downloader/lib/request",
      () => (opts: any) => {
        calls.push({ ...opts });
        return Promise.resolve({ filename: "test.jpg", image: Buffer.from("data") });
      }
    );
    
    const mod = require("../../../../../../../../../../../subject_repositories/image-downloader/index.js");
    
    const fakeDest = 'fake-absolute/test.jpg';
    await mod.image({ url: "http://example.com/test.jpg", dest: fakeDest, extractFilename: false });
    
    // Original: isAbsolute returns true, so dest stays as 'fake-absolute/test.jpg'
    // Mutated: always resolves, so dest becomes path.resolve(__dirname, 'fake-absolute/test.jpg')
    expect(calls[0].dest).toBe(fakeDest);
  });
});