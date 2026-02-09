#!/usr/bin/env python3
"""Generate creative/absurd Einoow avatar concepts - The Office vibes."""
import sys
import time
import vertexai
from vertexai.preview.vision_models import ImageGenerationModel
from pathlib import Path

print = lambda *args, **kwargs: (sys.stdout.write(' '.join(map(str, args)) + '\n'), sys.stdout.flush())

print("🚀 Starting creative avatars...")
vertexai.init(project="project-7cebe90a-8326-46c7-ac6", location="us-central1")
model = ImageGenerationModel.from_pretrained("imagen-3.0-generate-002")

OUTPUT_DIR = Path(__file__).parent / "avatars_creative"
OUTPUT_DIR.mkdir(exist_ok=True)

PERSON = """young man early 30s, short dark hair, short beard, 
Mediterranean complexion, confident slightly smug expression"""

AVATARS = {
    "ceo_of_crabs": f"""Digital illustration of {PERSON},
        sitting in fancy CEO leather chair, serious business expression,
        but surrounded by cartoon crabs wearing tiny ties,
        underwater office setting with fish swimming past window,
        dramatic lighting, absurd humor, The Office comedy vibes,
        high quality digital art, cinematic composition""",
    
    "ted_talk_fish": f"""Digital illustration of {PERSON},
        giving passionate TED talk presentation on stage,
        but the entire audience is colorful tropical fish,
        red TED logo visible, dramatic spotlight,
        enthusiastic presenter pose, absurd surreal humor,
        high quality illustration, comedy scene""",
    
    "submarine_captain": f"""Digital illustration of {PERSON},
        as serious submarine captain at periscope,
        wearing naval captain hat, intense focused expression,
        but the submarine has gaming RGB lights inside,
        mix of military serious and gamer aesthetic,
        cinematic lighting, absurd contrast humor""",
    
    "cooking_show": f"""Digital illustration of {PERSON},
        as TV cooking show host in professional kitchen,
        holding a spatula dramatically, chef hat,
        but cooking with cartoon sea creatures as ingredients,
        a worried shrimp watching from the side,
        bright TV studio lighting, absurd food show parody""",
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
