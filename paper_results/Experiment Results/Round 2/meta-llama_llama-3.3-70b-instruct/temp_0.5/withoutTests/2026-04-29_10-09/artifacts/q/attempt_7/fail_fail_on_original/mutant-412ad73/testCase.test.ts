import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise Library', () => {
  it('should throw an error when trying to use the Q library', () => {
    const Q = require('../../../../../../../../../subject_repositories/q/q.js');
    expect(() => Q()).toThrowError();
  });
});