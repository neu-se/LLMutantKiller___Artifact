import { Q } from "../q";

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

        expect(() => Q.mapply(object, name, args)).not.toThrow();
        expect(object.dispatch).toHaveBeenCalledTimes(1);
        expect(object.dispatch).toHaveBeenCalledWith('post', [name, args]);
    });

    it('should throw an error for invalid operation', () => {
        const object = {
            dispatch: jest.fn((op, args) => {
                if (op === '') {
                    throw new Error('Invalid operation');
                } else {
                    return 'success';
                }
            }),
        };
        const name = 'test';
        const args = ['arg1', 'arg2'];

        expect(() => Q.mapply(object, name, args)).toThrow('Invalid operation');
    });
});