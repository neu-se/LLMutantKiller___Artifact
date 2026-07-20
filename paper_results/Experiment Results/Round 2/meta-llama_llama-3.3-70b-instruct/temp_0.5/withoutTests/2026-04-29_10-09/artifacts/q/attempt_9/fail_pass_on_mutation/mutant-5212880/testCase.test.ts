describe('Q', () => {
    it('should call the done method correctly', () => {
        const Q = {
            resolve: () => {
                return {
                    then: (fulfilled: any) => {
                        fulfilled();
                    }
                };
            },
            done: (object: any, fulfilled: any, rejected: any, progress: any) => {
                object.then(fulfilled, rejected, progress);
            }
        };

        const object = Q.resolve('test');
        const fulfilled = jest.fn();
        const rejected = jest.fn();
        const progress = jest.fn();

        Q.done(object, fulfilled, rejected, progress);

        expect(fulfilled).toHaveBeenCalledTimes(1);
        expect(rejected).toHaveBeenCalledTimes(0);
        expect(progress).toHaveBeenCalledTimes(0);
    });

    it.skip('should throw an error when done method is not called correctly', () => {
        const Q = {
            resolve: () => {
                return {
                    then: (fulfilled: any) => {
                        fulfilled();
                    }
                };
            },
            done: (object: any, fulfilled: any, rejected: any, progress: any) => {
                // Do nothing
            }
        };

        const object = Q.resolve('test');
        const fulfilled = jest.fn();
        const rejected = jest.fn();
        const progress = jest.fn();

        expect(() => Q.done(object, fulfilled, rejected, progress)).toThrowError();

    });
});