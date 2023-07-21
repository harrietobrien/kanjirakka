import json
import requests

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
                Kanji.kanji_dict[str(grade)] = data

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

run = Kanji()