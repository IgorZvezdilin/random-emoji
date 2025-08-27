import { Injectable } from '@nestjs/common';

@Injectable()
export class EmojiService {
  getRandomEmoji(index?: number) {
    const emojis = this.getEmojis();
    const emojisIndex =
      typeof index !== 'undefined'
        ? index
        : Math.floor(Math.random() * emojis.length);
    return emojis[emojisIndex];
  }

  getEmojis(): string[] {
    return ['🐙', '🌵', '🦄', '🍕', '🎸', '🛸', '🐢', '🌈', '⚡', '🎯'];
  }
}
