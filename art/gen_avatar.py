#!/usr/bin/env python3
"""Generate Einoow avatar concepts based on reference."""
import sys
import time
import vertexai
from vertexai.preview.vision_models import ImageGenerationModel
from pathlib import Path

print = lambda *args, **kwargs: (sys.stdout.write(' '.join(map(str, args)) + '\n'), sys.stdout.flush())

print("🚀 Starting...")
vertexai.init(project="project-7cebe90a-8326-46c7-ac6", location="us-central1")
model = ImageGenerationModel.from_pretrained("imagen-3.0-generate-002")

OUTPUT_DIR = Path(__file__).parent / "avatars"
OUTPUT_DIR.mkdir(exist_ok=True)

# Base description of the person
PERSON = """young man early 30s, short dark hair, short well-groomed beard, 
Mediterranean complexion, confident friendly expression, intelligent eyes"""

AVATARS = {
    "editorial_tech": f"""Digital illustration portrait of {PERSON},
        semi-realistic editorial illustration style like tech magazine cover,
        dramatic side lighting, deep blue and orange accent colors,
        professional but with personality, slight confident smirk,
        clean minimal background with subtle geometric shapes,
        high quality digital art, sharp details""",
    
    "indie_creator": f"""Stylized character portrait of {PERSON},
        modern indie game character design style, 
        warm colors, soft cel shading, expressive eyes,
        wearing casual hoodie, creative passionate vibe,
        subtle glow effect, digital creator aesthetic,
        Pixar-meets-indie-game style, appealing and memorable""",
    
    "gaming_showman": f"""Dynamic portrait illustration of {PERSON},
        gaming content creator style, energetic pose,
        vibrant lighting with cyan and magenta accents,
        confident charismatic expression, slight smile,
        modern streamer aesthetic, bold graphic style,
        dark background with subtle tech/gaming elements,
        YouTube thumbnail quality, eye-catching""",
    
    "minimal_iconic": f"""Minimalist vector-style portrait of {PERSON},
        clean geometric illustration, limited color palette,
        navy blue, white and orange accent,
        recognizable silhouette, iconic and memorable,
        flat design with subtle gradients,
        professional brand avatar style, timeless""",
}

for name, prompt in AVATARS.items():
    print(f"\n🎨 Generating: {name}")
    try:
        response = model.generate_images(
            prompt=prompt,
            number_of_images=1,
            aspect_ratio="1:1",
            safety_filter_level="block_few",
            person_generation="allow_adult",
        )
        if response.images:
            out_path = OUTPUT_DIR / f"{name}.png"
            response.images[0].save(str(out_path))
            print(f"✅ Saved: {out_path}")
        else:
            print("❌ No image")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    if name != list(AVATARS.keys())[-1]:
        print("⏳ Waiting 65s...")
        time.sleep(65)

print("\n🏁 Done!")
