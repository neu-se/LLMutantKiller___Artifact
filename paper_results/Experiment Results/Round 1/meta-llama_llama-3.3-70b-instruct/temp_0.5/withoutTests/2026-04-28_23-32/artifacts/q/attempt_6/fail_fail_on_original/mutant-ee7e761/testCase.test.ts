import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should throw an error when trying to access a method with an empty string', () => {
        const obj = Q({});
        expect(() => obj[""]).toThrowError();
    });
});