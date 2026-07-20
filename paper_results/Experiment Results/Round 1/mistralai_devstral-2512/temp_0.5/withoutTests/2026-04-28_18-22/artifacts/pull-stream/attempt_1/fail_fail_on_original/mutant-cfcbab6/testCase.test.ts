import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function", () => {
  it("should correctly handle multiple arguments without off-by-one error", () => {
    const source = {
      source: true,
      read: jest.fn().mockReturnValue(null)
    };

    const sink1 = jest.fn().mockReturnValue({
      source: {
        read: jest.fn().mockReturnValue(null)
      }
    });

    const sink2 = jest.fn().mockReturnValue({
      source: {
        read: jest.fn().mockReturnValue(null)
      }
    });

    const result = pull(source, sink1, sink2);

    expect(sink1).toHaveBeenCalledTimes(1);
    expect(sink2).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});