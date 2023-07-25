import json
import requests
from operator import itemgetter

class Kanji:
    kanji_dict = dict()

    def __init__(self):
        self.create_dict()
        with open('kanji.json', 'wb') as file:
            file.write(json.dumps(Kanji.kanji_dict,
                                  ensure_ascii=False)
                       .encode("utf8"))

    @staticmethod
    def create_dict():
        url = "https://kanjiapi.dev/v1/kanji"

        def get_all():
            response = requests.get(f'{url}/all')
            data = json.loads(response.text)
            Kanji.kanji_dict["all"] = data

        get_all()

        def get_grades():
            grades = list(range(1, 7))
            grades.append(8)
            for grade in grades:
                response = requests.get(f'{url}/grade-{grade}')
                data = json.loads(response.text)
                Kanji.kanji_dict[f'grade-{grade}'] = data

        get_grades()

        def get_jouyou():
            response = requests.get(f'{url}/jouyou')
            data = json.loads(response.text)
            Kanji.kanji_dict["jouyou"] = data

        get_jouyou()

        def get_jinmeiyou():
            response = requests.get(f'{url}/jinmeiyou')
            data = json.loads(response.text)
            Kanji.kanji_dict["jinmeiyou"] = data

        get_jinmeiyou()

        def get_jlpt_levels():
            kanji_file = open('kanjiapi.json')
            kanji_dict = json.load(kanji_file)['kanjis']
            kanji_objs = kanji_dict.values()
            by_level = itemgetter("kanji", "jlpt")
            level_dict = dict(map(by_level, kanji_objs))
            jlpt_level = set(level_dict.values())
            for lvl in jlpt_level:
                kanji_at_lvl = list(filter(lambda k:
                    level_dict[k] == lvl, level_dict))
                if lvl is None:
                    Kanji.kanji_dict[f'jlpt-{0}'] = kanji_at_lvl
                else:
                    Kanji.kanji_dict[f'jlpt-{lvl}'] = kanji_at_lvl

        get_jlpt_levels()

run = Kanji()
levels = [f'jlpt-{lvl}' for lvl in range(5)]
grades = [f'grade-{grade}' for grade in range(1,7)]
for i in levels:
    print(i)
    print(run.kanji_dict[i])
    print(len(run.kanji_dict[i]))
for j in grades:
    print(j)
    print(run.kanji_dict[j])
    print(len(run.kanji_dict[j]))