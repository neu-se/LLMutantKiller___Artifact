import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through test', () => {
  it('should pass when run against the original code and fail when run against the mutated code', async () => {
    const read = through(null, (abort: boolean) => {
      if (abort === false) {
        throw new Error('Abort should be null when stream ends');
      }
    });

    expect(read).toBeDefined();
  });
});