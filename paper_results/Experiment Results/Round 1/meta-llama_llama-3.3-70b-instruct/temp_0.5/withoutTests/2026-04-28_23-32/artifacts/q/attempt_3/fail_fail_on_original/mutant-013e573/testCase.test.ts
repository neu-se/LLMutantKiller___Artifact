import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.npost', () => {
    it('should handle args correctly', () => {
        const object = { post: jest.fn() };
        const name = 'test';
        const args = ['arg1', 'arg2'];

        Q.npost(object, name, args);

        expect(object.post).toHaveBeenCalledTimes(1);
        expect(object.post).toHaveBeenCalledWith(name, args);
    });
});