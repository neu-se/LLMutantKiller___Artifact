import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not throw an error when calling makeStackTraceLong', () => {
        const error = new Error();
        const p = { stackCounter: 1 };
        expect(() => {
            Q.makeStackTraceLong(error, Q.defer().promise);
        }).not.toThrowError();
    });
});