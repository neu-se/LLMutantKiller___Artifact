// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/image-downloader/attempt_1/pending_category/mutant-2626324/testCase.test.ts
const path = require("path");
const request = require("../../../../../../../../../../../subject_repositories/image-downloader/lib/request");

describe("image downloader - path resolution", () => {
  it("should properly resolve relative paths to absolute paths", () => {
    const originalResolve = path.resolve;
    const resolveSpy = jest.spyOn(path, "resolve");

    const testUrl = "https://example.com/image.jpg";
    const relativeDest = "./downloads";

    // Mock the request to avoid actual network calls
    jest.mock("../../../../../../../../../../../subject_repositories/image-downloader/lib/request", () => ({
      __esModule: true,
      default: jest.fn().mockResolvedValue(undefined)
    }));

    const image = require("../../../../../../../../../../../subject_repositories/image-downloader/index.js").image;

    return image({ url: testUrl, dest: relativeDest }).then(() => {
      // In original code, path.resolve should be called
      // In mutated code, it won't be called
      expect(resolveSpy).toHaveBeenCalled();
      resolveSpy.mockRestore();
    });
  });
});