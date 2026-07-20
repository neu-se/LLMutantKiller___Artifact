import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when the when method does not call its callbacks', () => {
        const whenOriginal = Q.when;
        Q.when = () => {};
        expect(() => Q.when(1, () => {}, () => {})).toThrow();
        Q.when = whenOriginal;
    });
});