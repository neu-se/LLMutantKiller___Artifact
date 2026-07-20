import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise library', () => {
    it('should throw an error when trying to use an empty string as a property name', () => {
        const promise = Q.resolve();
        expect(() => promise[""]).toThrowError();
    });
});