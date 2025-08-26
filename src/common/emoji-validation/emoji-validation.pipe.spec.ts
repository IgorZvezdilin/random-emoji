import { EmojiValidationPipe } from './emoji-validation.pipe';
import { BadRequestException } from '@nestjs/common';

describe('EmojiValidationPipe', () => {
  const emojiValidationPipe = new EmojiValidationPipe();
  it('should be defined', () => {
    expect(emojiValidationPipe).toBeDefined();
  });

  it('should return undefined if no value passed in', () => {
    const result = emojiValidationPipe.transform(undefined);
    expect(result).toBeUndefined();
  });

  it('should throw error if value is not a number', () => {
    const result = () => emojiValidationPipe.transform('hello');
    expect(result).toThrow(BadRequestException);
  });

  it('should throw error if out of range', () => {
    const result = () => emojiValidationPipe.transform(-5);
    expect(result).toThrow(BadRequestException);
  });

  it('convert string into a number', () => {
    const result = emojiValidationPipe.transform('5');
    expect(result).toEqual(5);
  });
});
