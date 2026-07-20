import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";
import { collect } from "pull-core";

describe('values source', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const ary = [1, 2, 3];
    const expected = [1, 2, 3];

    values(ary, () => {
      // Do nothing on abort
    })(null, (end, data) => {
      if (end === true) {
        // End of stream
        return;
      }
      if (end) {
        throw end;
      }
      expect(data).toBe(expected.shift());
    });

    const result: any[] = [];
    collect((err: any, data: any) => {
      if (err) throw err;
      result.push(data);
    })(values(ary));

    expect(result).toEqual(expected);
  });
});