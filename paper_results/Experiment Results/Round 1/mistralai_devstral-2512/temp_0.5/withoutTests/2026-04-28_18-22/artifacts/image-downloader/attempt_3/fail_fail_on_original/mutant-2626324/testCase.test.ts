// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/image-downloader/attempt_1/pending_category/mutant-2626324/testCase.test.ts
const { image } = require("../../../../../../../../../../../subject_repositories/image-downloader/index.js");
const path = require("path");

describe("image downloader", () => {
  it("should resolve relative destination path to absolute path", async () => {
    const testUrl = "https://example.com/image.jpg";
    const relativeDest = "./downloads";

    // Mock the request module to avoid actual network calls
    const mockRequest = jest.fn().mockResolvedValue(undefined);
    jest.mock("../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js", () => mockRequest);

    await image({ url: testUrl, dest: relativeDest });

    // In the original code, the path should be resolved to absolute
    // In the mutated code, the path remains relative
    const expectedAbsoluteDest = path.resolve(__dirname, relativeDest, "image.jpg");
    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        dest: expectedAbsoluteDest
      })
    );
  });
});