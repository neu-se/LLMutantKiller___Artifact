import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find sink mutation test', () => {
  it('should handle error callback correctly when err is true', (done) => {
    const testData = [1, 2, 3];
    const error = true;
    const callback = jest.fn((err, data) => {
      expect(err).toBeNull();
      expect(data).toBeNull();
      done();
    });

    const source = {
      pipe: (sink) => {
        sink.write(testData[0]);
        sink.write(testData[1]);
        sink.write(testData[2]);
        sink.end(error);
      }
    };

    const findSink = find(() => false, callback);
    source.pipe(findSink);
  });
});