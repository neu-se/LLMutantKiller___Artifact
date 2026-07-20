import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.denodeify', () => {
    it('should throw an error when the callback is undefined in the mutated code', () => {
        const callback = undefined;
        expect(() => Q.denodeify(callback)).toThrowError();
    });
});