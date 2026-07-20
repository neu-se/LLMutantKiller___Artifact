import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embed handler', () => {
  it('should throw error when handler is not registered for embed type', () => {
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().retain({ embed: 2 });
    expect(() => {
      a.transform(b, true);
    }).toThrowError('no handlers for embed type "embed"');
  });
});