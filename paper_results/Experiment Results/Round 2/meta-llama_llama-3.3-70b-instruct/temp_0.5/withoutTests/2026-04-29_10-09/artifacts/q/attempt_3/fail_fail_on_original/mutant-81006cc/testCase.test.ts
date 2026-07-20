import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.mapply', () => {
    it('should dispatch "post" operation', () => {
        const object = {
            dispatch: jest.fn((op, args) => {
                if (op === 'post') {
                    return 'success';
                } else {
                    throw new Error('Invalid operation');
                }
            }),
        };
        const name = 'test';
        const args = ['arg1', 'arg2'];

        const result = Q.mapply(object, name, args);

        expect(object.dispatch).toHaveBeenCalledTimes(1);
        expect(object.dispatch).toHaveBeenCalledWith('post', [name, args]);
        expect(result).toBe('success');
    });
});