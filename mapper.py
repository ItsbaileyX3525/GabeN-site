import os
import json

items = []
soundsPath = "public/audio/sounds"

for e in os.listdir(soundsPath):
    if not os.path.isdir(soundsPath + "/" + e):
        print("passing: ", e)
        continue
    if e == "map.json":
        continue

    for x in os.listdir("public/audio/sounds/" + e):
        print(x)
        item = {"name" : x, "path" : "audio/sounds/" + e + "/" + x, "type" : e}
        items.append(item)



print(items)

with open("public/audio/sounds/map.json", "w") as f:
    json.dump(items, f, indent=4)