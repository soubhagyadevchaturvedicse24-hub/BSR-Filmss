# BSR Films — Video Frames Directory

Place your extracted video frames here, named sequentially:

```
frame_0001.jpg
frame_0002.jpg
...
frame_0150.jpg
```

## Extraction Command (FFmpeg)

```bash
# Extract 150 frames at 25fps from your hero video
ffmpeg -i your_hero_video.mp4 -vf fps=25 -q:v 2 public/frames/frame_%04d.jpg

# Optional: resize to 1920×1080 for optimal performance
ffmpeg -i your_hero_video.mp4 -vf "fps=25,scale=1920:1080" -q:v 2 public/frames/frame_%04d.jpg
```

## Visual Story (frame descriptions)

| Frames      | Content                                                          |
|-------------|------------------------------------------------------------------|
| 0001–0050   | DSLR camera on tripod in blurred forest. Chitrakote waterfall visible inside the lens glass. |
| 0051–0100   | Camera dollies in slowly; the black lens ring begins to fill the entire frame. |
| 0101–0150   | User "passes through" the lens — full-screen cinematic Chitrakote waterfall shot. |

## Performance Tips

- Export frames as JPEG at quality 80–85% (not 100%) to reduce file size.
- If you have more than 150 frames, update `TOTAL_FRAMES` in `src/components/HeroCanvas.tsx`.
- For very large frame counts (300+), consider using WebP format for ~30% smaller files.
