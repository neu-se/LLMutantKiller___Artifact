import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.npost', () => {
    it('should not modify the original args', () => {
        const object = {};
        const name = 'test';
        const args = ['arg1', 'arg2'];
        const originalArgs = [...args];

        Q.npost(object, name, args);

        expect(args).toEqual(originalArgs);
    });
});