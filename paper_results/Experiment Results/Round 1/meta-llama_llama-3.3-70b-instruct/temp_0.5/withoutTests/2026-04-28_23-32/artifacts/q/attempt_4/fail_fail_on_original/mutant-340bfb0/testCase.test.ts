import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when trying to access a property with an empty string as key', () => {
        const error = new Error();
        Q.makeStackTraceLong(error, Q.defer().promise);
        expect(() => {
            const _ = error[""];
        }).toThrowError();
    });
});