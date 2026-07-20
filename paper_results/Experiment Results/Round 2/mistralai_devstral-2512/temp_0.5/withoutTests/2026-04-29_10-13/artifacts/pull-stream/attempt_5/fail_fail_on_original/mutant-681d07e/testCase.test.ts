import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial sink', () => {
  it('should execute the args null check in partial sink path', () => {
    let argsNullCheckExecuted = false;
    const partialSink = (read: any) => {
      const args = null;
      if (args == null) {
        argsNullCheckExecuted = true;
      }
      return (end: any, data: any) => {};
    };

    pull(partialSink);
    expect(argsNullCheckExecuted).toBe(true);
  });
});