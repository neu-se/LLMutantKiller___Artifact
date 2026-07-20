import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from "path";

describe("image downloader path resolution", () => {
  it("should correctly resolve relative destination paths to absolute", async () => {
    const testUrl = "https://example.com/image.jpg";
    const relativeDest = "./downloads";

    // Mock the request module to capture the final options
    const mockRequest = jest.fn().mockResolvedValue(undefined);
    jest.spyOn(require("../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js"), 'default').mockImplementation(mockRequest);

    await image({ url: testUrl, dest: relativeDest });

    // Get the path that was actually passed to request
    const calledOptions = mockRequest.mock.calls[0][0];
    const calledPath = calledOptions.dest;

    // In original code: relative paths should be resolved to absolute
    // In mutated code: paths will remain relative (since if (true) always executes)
    expect(path.isAbsolute(calledPath)).toBe(true);

    // Also verify the path contains the expected components
    expect(calledPath).toContain("downloads");
    expect(calledPath).toContain("image.jpg");
  });
});