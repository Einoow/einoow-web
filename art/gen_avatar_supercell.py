#!/usr/bin/env python3
"""Generate Einoow avatar in Clash of Clans Barbarian style."""
import sys
import time
import vertexai
from vertexai.preview.vision_models import ImageGenerationModel
from pathlib import Path

print = lambda *args, **kwargs: (sys.stdout.write(' '.join(map(str, args)) + '\n'), sys.stdout.flush())

print("🚀 Starting Supercell style avatars...")
vertexai.init(project="project-7cebe90a-8326-46c7-ac6", location="us-central1")
model = ImageGenerationModel.from_pretrained("imagen-3.0-generate-002")

OUTPUT_DIR = Path(__file__).parent / "avatars_supercell"
OUTPUT_DIR.mkdir(exist_ok=True)

# Clash of Clans Barbarian style - exaggerated 3D cartoon
PERSON = """Mediterranean man, short dark hair, short dark beard, intense expressive eyes"""

AVATARS = {
    "battle_cry": f"""Supercell Clash of Clans style 3D character portrait,
        {PERSON}, epic battle cry expression with mouth wide open showing teeth,
        wearing underwater warrior helmet with coral decorations,
        intense dramatic close-up like the Barbarian icon,
        exaggerated cartoon proportions, vibrant saturated colors,
        dynamic pose, deep blue ocean background,
        Supercell mobile game art style, highly detailed 3D render""",
    
    "confident_smirk": f"""Supercell Clash of Clans style 3D character portrait,
        {PERSON}, confident smirk expression, one eyebrow raised,
        wearing futuristic gaming headset with glowing cyan accents,
        dramatic side lighting, close-up face shot,
        exaggerated cartoon features like Supercell characters,
        vibrant colors, dark background with tech elements,
        mobile game character art, 3D rendered""",
    
    "sea_commander": f"""Supercell Clash of Clans style 3D character portrait,
        {PERSON}, determined heroic expression,
        wearing ornate sea captain armor with shells and coral,
        trident visible behind, underwater scene,
        epic dramatic lighting from below,
        exaggerated stylized proportions like Clash Royale characters,
        saturated ocean blues and gold accents,
        mobile game hero portrait, 3D cartoon style""",
    
    "gaming_legend": f"""Supercell Brawl Stars style 3D character portrait,
        {PERSON}, excited energetic expression, slight smile,
        wearing hoodie with gaming RGB lighting effects,
        holding glowing controller,
        dynamic angle, vibrant neon pink and cyan colors,
        exaggerated cartoon style like Supercell games,
        dark background with particle effects,
        esports gaming mascot aesthetic""",
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
