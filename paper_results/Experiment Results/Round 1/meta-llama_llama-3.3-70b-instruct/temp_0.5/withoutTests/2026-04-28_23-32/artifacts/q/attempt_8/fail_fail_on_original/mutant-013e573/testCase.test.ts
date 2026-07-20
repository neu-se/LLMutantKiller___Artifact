import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.npost', () => {
    it('should handle args correctly when args is undefined', () => {
        const object = { post: jest.fn() };
        const name = 'test';

        Q.npost(object, name, undefined);

        expect(object.post).toHaveBeenCalledTimes(1);
        expect(object.post).toHaveBeenCalledWith(name, expect.not.arrayContaining(['Stryker was here']));
    });
});