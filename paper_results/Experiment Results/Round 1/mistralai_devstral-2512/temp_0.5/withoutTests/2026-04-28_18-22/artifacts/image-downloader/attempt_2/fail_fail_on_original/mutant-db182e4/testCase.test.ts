import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from "path";

describe("image downloader", () => {
  it("should handle relative destination paths correctly", async () => {
    const testUrl = "https://example.com/image.jpg";
    const relativeDest = "./downloads";
    const expectedAbsoluteDest = path.resolve(__dirname, relativeDest, "image.jpg");

    const mockRequest = jest.fn().mockResolvedValue(undefined);
    jest.mock("../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js", () => ({
      __esModule: true,
      default: mockRequest
    }));

    await image({ url: testUrl, dest: relativeDest });

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        dest: expectedAbsoluteDest
      })
    );
  });
});