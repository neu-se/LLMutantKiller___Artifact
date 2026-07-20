// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/image-downloader/attempt_1/pending_category/mutant-2626324/testCase.test.ts
import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from "path";

describe("image downloader", () => {
  it("should resolve relative destination path to absolute path", async () => {
    const testUrl = "https://example.com/image.jpg";
    const relativeDest = "./downloads";
    const mockRequest = jest.fn().mockResolvedValue(undefined);

    // Mock the request module
    jest.mock("../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js", () => ({
      __esModule: true,
      default: mockRequest
    }));

    await image({ url: testUrl, dest: relativeDest });

    // Verify that the destination path was resolved to an absolute path
    const expectedAbsoluteDest = path.resolve(__dirname, relativeDest, "image.jpg");
    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        dest: expectedAbsoluteDest
      })
    );
  });
});