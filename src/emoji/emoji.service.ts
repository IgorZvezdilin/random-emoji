import { Injectable } from '@nestjs/common';

@Injectable()
export class EmojiService {
  getRandomEmoji(index?: number) {
    const emojis = this.getEmojis();
    const emojisIndex = index || Math.floor(Math.random() * emojis.length);
    return emojis[emojisIndex];
  }

  private getEmojis(): string[] {
    return ['🐙', '🌵', '🦄', '🍕', '🎸', '🛸', '🐢', '🌈', '⚡', '🎯'];
  }
}
