import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";

describe("image downloader - missing dest error message", () => {
  it("should reject with an error message containing 'options.dest is required' when dest is not provided", async () => {
    let caughtError: Error | null = null;

    try {
      await image({ url: "http://someurl.com/image.jpg", dest: null as any });
    } catch (err) {
      caughtError = err as Error;
    }

    expect(caughtError).not.toBeNull();
    expect(caughtError).toBeInstanceOf(Error);
    expect(caughtError!.message).toBe("The options.dest is required");
  });
});