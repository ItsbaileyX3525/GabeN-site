import os
import json

items = []

for e in os.listdir("public/audio/hlSounds"):
    if e == "map.json":
        continue
    item = {"name" : e, "path" : "audio/hlSounds/" + e}
    items.append(item)

print(items)

with open("public/audio/hlSounds/map.json", "w") as f:
    json.dump(items, f, indent=4)