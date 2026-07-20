import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.mapply', () => {
    it('should dispatch "post" operation', () => {
        const object = {
            post: jest.fn(),
        };
        const name = 'test';
        const args = ['arg1', 'arg2'];

        Q.mapply(object, name, args);

        expect(object.post).toHaveBeenCalledTimes(1);
        expect(object.post).toHaveBeenCalledWith(name, args);
    });
});