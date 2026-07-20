import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.npost', () => {
    it('should handle args correctly when args is undefined', () => {
        const object = { post: jest.fn() };
        const name = 'test';

        Q.npost(object, name);

        expect(object.post).toHaveBeenCalledTimes(1);
        expect(object.post).toHaveBeenCalledWith(name, []);
    });
});