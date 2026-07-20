import { Dirty } from '../../../lib/dirty/dirty';

describe('dirty close', function () {
  it('should call close once when queue size is 0', function (done) {
    const db = new Dirty();
    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        db.on('write_close', () => {
          done();
        });
      });
    });
  });
});