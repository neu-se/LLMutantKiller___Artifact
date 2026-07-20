import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";
import { jest } from '@jest/globals';

describe('through', () => {
  it('should call onEnd with null when abort is true', () => {
    const onEndSpy = jest.fn();
    const throughStream = through(null, onEndSpy);
    const read = throughStream(function () {});
    read(true, function () {});
    expect(onEndSpy).toHaveBeenCalledTimes(1);
    expect(onEndSpy).toHaveBeenCalledWith(null);
  });
});