import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when trying to access a non-existent property on the error object', () => {
        const error = new Error();
        Q.makeStackTraceLong(error, Q.defer().promise);
        expect(() => {
            const _ = (error as any)["nonExistentProperty"];
        }).toThrowError();
    });
});