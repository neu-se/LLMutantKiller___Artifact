import { through } from "../../../../../../../../subject_repositories/pull-stream/throughs/through.js";
import { values } from "../../../../../../../../subject_repositories/pull-stream/sources/values.js";
import { collect } from "../../../../../../../../subject_repositories/pull-stream/sinks/collect.js";

describe('through', () => {
  it('should call onEnd with null when abort is false', (done) => {
    let called = false;
    const onEnd = jest.fn((err) => {
      expect(err).toBeNull();
      called = true;
    });
    const read = through(null, onEnd);
    read(null, () => {
      read(true, () => {
        expect(called).toBe(true);
        done();
      });
    });
  });
});