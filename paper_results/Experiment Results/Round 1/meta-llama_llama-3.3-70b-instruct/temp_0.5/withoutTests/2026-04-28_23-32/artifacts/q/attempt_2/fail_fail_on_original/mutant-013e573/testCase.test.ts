import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.npost', () => {
    it('should not add extra arguments when args is not provided', () => {
        const object = {};
        const name = 'test';

        const promise = Q.npost(object, name);

        promise.then((result) => {
            expect(result).not.toContain('Stryker was here');
        });
    });
});