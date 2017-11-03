import csv
import json

# 2 = Budget
# 3 = Genre(s)
# 8 = Original Title
# 9 = Description
# 10 = Popularity
# 12 = Production Companies
# 13 = Production Countries
# 14 = Release Date
# 15 = Revenue
# 16 = Runtime
# 20 = Title
# 22 = Vote Average
# 23 = Vote Count


with open("output.csv", "w") as outfile:

    lines = []
    with open('movies_metadata.csv', 'r') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar='|')
        for row in reader:
            try:
                # genres_json = json.loads(row[3])
                # print(genres_json)
                # genres_text = "|".join([genre.name for genre in genres_json])

                fields = [row[2], row[3], row[8], row[9], row[10], row[12], row[13], row[14], row[15], row[16], row[20], row[22], row[23]]
                line = ",".join(fields)
                lines.append(line)
            except:
                pass

    with open('output.csv', 'w') as outfile:
        for line in lines[:1000]:
            outfile.write(line + "\n")
