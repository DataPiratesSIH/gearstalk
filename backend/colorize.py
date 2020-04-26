import nltk
from nltk.tokenize import word_tokenize
from matplotlib import colors
from nltk.stem import WordNetLemmatizer

nltk.download('punkt')
nltk.download('wordnet')

lemmatizer = WordNetLemmatizer()
# print(lemmatizer.lemmatize('increases'))
stopwords = ['The', 'sky', 'is']
# colors.to_rgba(color)
# colors.to_rgba_array(color)

def colorize(sent):
    tokens = word_tokenize(sent)
    prev = ""
    color_values = []
    features = []
    for token in tokens:
        lemmatizer.lemmatize(token)
        if len(token) > 1 and colors.is_color_like(token):
            if colors.is_color_like(prev + token):
                color_values.append(list(colors.to_rgba(prev + token)))
            else:
                color_values.append(list(colors.to_rgba(token)))
            prev = token
        elif token in stopwords:
            features.append(token) 
    return color_values,features

print(colorize("red The sky blue is darkblue"))


# from numpy import dot
# from numpy.linalg import norm
# # from sklearn.metrics.pairwise import cosine_similarity
# import numpy as np



# a = [0., 0., 1., 1.]
# b = [[0., 1., 0.54509804, 1.], [0., 0., 1., 1.]]

# def cosine(x, y):
#     dot_products = np.dot(x, y.T)
#     norm_products = np.linalg.norm(x) * np.linalg.norm(y)
#     return dot_products / (norm_products + EPSILON)

# # def cosine_similarity(vector,matrix):
# #    return ( np.sum(vector*matrix,axis=1) / ( np.sqrt(np.sum(matrix**2,axis=1)) * np.sqrt(np.sum(vector**2)) ) )[::-1]

# # # cos_sim = dot(a, b)/(norm(a)*norm(b))
# cos_sim = cosine(b,a)
# print(cos_sim)
