import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const white = { r: 255, g: 255, b: 255, alpha: 1 };

const tiles = [
  { name: 'promo_tile_small', width: 440, height: 280 },
  { name: 'promo_tile_large', width: 920, height: 680 },
  { name: 'promo_tile_marquee', width: 1400, height: 560 },
];

await mkdir('promo/chrome', { recursive: true });

await Promise.all(
  tiles.map((tile) =>
    sharp('assets/promo_tile.svg', { density: 2000 })
      .resize(tile.width, tile.height, { fit: 'contain', background: white })
      .flatten({ background: white })
      .png()
      .toFile(`promo/chrome/${tile.name}.png`),
  ),
);
