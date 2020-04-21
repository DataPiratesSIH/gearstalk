import nltk
from nltk.tokenize import word_tokenize
from matplotlib import colors
nltk.download('punkt')

# colors.to_rgba(color)
# colors.to_rgba_array(color)

def colorize(sent):
    tokens = word_tokenize(sent)
    prev = ""
    color_values = []
    for token in tokens:
        if len(token) > 1 and colors.is_color_like(token):
        if colors.is_color_like(prev + token):
            color_values.append(colors.to_hex(prev + token))
        else:
            color_values.append(colors.to_hex(token))
        prev = token
    return color_values

colorize("The sky is light blue")
