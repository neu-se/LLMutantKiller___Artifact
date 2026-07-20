import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should have a property __minimumStackCounter__ on the error object', () => {
        const error = new Error();
        const p = { stackCounter: 1 };
        Q.makeStackTraceLong(error, Q.defer().promise);
        expect(Object.getOwnPropertyNames(error)).toContain('__minimumStackCounter__');
    });
});