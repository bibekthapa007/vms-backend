import 'dotenv/config';
import { describe, expect, it } from '@jest/globals';
import { createJwtToken } from 'src/middlewares/jwt';

describe('This is a test', () => {
  it('should pass', () => {
    expect(createJwtToken({ id: 1, email: 'bibekthapa922@gmail.com' }).length).toBe(183);
  });
});
