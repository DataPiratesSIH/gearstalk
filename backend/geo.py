# from geopy.geocoders import Nominatim
# x = "Sanpada,Navi Mumbai"
# geolocator = Nominatim(user_agent="gearstalk")
# location = geolocator.geocode(x)
# print(location.latitude)

from datetime import datetime
import googlemaps
gmaps = googlemaps.Client(key='AIzaSyCMADuWmaxW-M9kzcQsPSouM1_sZKrE7sQ')
geocode_result = gmaps.geocode('Gayatri chs,Sanpada,Navi Muumbai')
print(geocode_result[0]['geometry']['location'])

# now = datetime.now()
# directions_result = gmaps.directions("Sydney Town Hall",
#                                      "Parramatta, NSW",
#                                      mode="transit",
#                                      departure_time=now)

# print(directions_result)