// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/image-downloader/attempt_1/pending_category/mutant-2626324/testCase.test.ts
const path = require("path");

describe("image downloader - path resolution", () => {
  it("should call path.resolve for relative destinations", async () => {
    const mockRequest = jest.fn().mockResolvedValue(undefined);
    jest.mock("../../../../../../../../../../../subject_repositories/image-downloader/lib/request", () => mockRequest);

    const { image } = require("../../../../../../../../../../../subject_repositories/image-downloader/index.js");

    const resolveSpy = jest.spyOn(path, "resolve");
    const testUrl = "https://example.com/image.jpg";
    const relativeDest = "./downloads";

    await image({ url: testUrl, dest: relativeDest });

    // In original code, path.resolve should be called
    // In mutated code, it won't be called
    expect(resolveSpy).toHaveBeenCalled();
    resolveSpy.mockRestore();
  });
});