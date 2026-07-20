import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw a TypeError with a specific message when called as a partial sink', () => {
    const partialSink = pull(function () { });
    try {
      partialSink(function () { });
      partialSink(function () { });
    } catch (e: any) {
      if (e.message !== 'partial sink should only be called once!') {
        throw new Error('Expected error message "partial sink should only be called once!" but got "' + e.message + '"');
      }
      return;
    }
    throw new Error('Expected an error to be thrown');
  });
});