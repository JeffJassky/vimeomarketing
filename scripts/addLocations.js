require('dotenv').config();
require('../database');

const LocationModel = require('../models/model.location');


const locations = [
    {
        "city": "Birmingham ",
        "state": "Alabama",
        "population": 242820,
        "query": "Birmingham, Alabama"
    },
    {
        "city": "Montgomery ",
        "state": "Alabama",
        "population": 201568,
        "query": "Montgomery, Alabama"
    },
    {
        "city": "Mobile ",
        "state": "Alabama",
        "population": 198915,
        "query": "Mobile, Alabama"
    },
    {
        "city": "Huntsville ",
        "state": "Alabama",
        "population": 158216,
        "query": "Huntsville, Alabama"
    },
    {
        "city": "Tuscaloosa ",
        "state": "Alabama",
        "population": 77906,
        "query": "Tuscaloosa, Alabama"
    },
    {
        "city": "Hoover ",
        "state": "Alabama",
        "population": 62742,
        "query": "Hoover, Alabama"
    },
    {
        "city": "Dothan ",
        "state": "Alabama",
        "population": 57737,
        "query": "Dothan, Alabama"
    },
    {
        "city": "Decatur ",
        "state": "Alabama",
        "population": 53929,
        "query": "Decatur, Alabama"
    },
    {
        "city": "Anchorage ",
        "state": "Alaska",
        "population": 260283,
        "query": "Anchorage, Alaska"
    },
    {
        "city": "Phoenix ",
        "state": "Arizona",
        "population": 1321045,
        "query": "Phoenix, Arizona"
    },
    {
        "city": "Tucson ",
        "state": "Arizona",
        "population": 486699,
        "query": "Tucson, Arizona"
    },
    {
        "city": "Mesa ",
        "state": "Arizona",
        "population": 396375,
        "query": "Mesa, Arizona"
    },
    {
        "city": "Glendale ",
        "state": "Arizona",
        "population": 218812,
        "query": "Glendale, Arizona"
    },
    {
        "city": "Scottsdale ",
        "state": "Arizona",
        "population": 202705,
        "query": "Scottsdale, Arizona"
    },
    {
        "city": "Chandler ",
        "state": "Arizona",
        "population": 176581,
        "query": "Chandler, Arizona"
    },
    {
        "city": "Tempe ",
        "state": "Arizona",
        "population": 158625,
        "query": "Tempe, Arizona"
    },
    {
        "city": "Gilbert town",
        "state": "Arizona",
        "population": 109697,
        "query": "Gilbert town, Arizona"
    },
    {
        "city": "Peoria ",
        "state": "Arizona",
        "population": 108364,
        "query": "Peoria, Arizona"
    },
    {
        "city": "Yuma ",
        "state": "Arizona",
        "population": 77515,
        "query": "Yuma, Arizona"
    },
    {
        "city": "Flagstaff ",
        "state": "Arizona",
        "population": 52894,
        "query": "Flagstaff, Arizona"
    },
    {
        "city": "Little Rock ",
        "state": "Arkansas",
        "population": 183133,
        "query": "Little Rock, Arkansas"
    },
    {
        "city": "Fort Smith ",
        "state": "Arkansas",
        "population": 80268,
        "query": "Fort Smith, Arkansas"
    },
    {
        "city": "North Little Rock ",
        "state": "Arkansas",
        "population": 60433,
        "query": "North Little Rock, Arkansas"
    },
    {
        "city": "Fayetteville ",
        "state": "Arkansas",
        "population": 58047,
        "query": "Fayetteville, Arkansas"
    },
    {
        "city": "Jonesboro ",
        "state": "Arkansas",
        "population": 55515,
        "query": "Jonesboro, Arkansas"
    },
    {
        "city": "Pine Bluff ",
        "state": "Arkansas",
        "population": 55085,
        "query": "Pine Bluff, Arkansas"
    },
    {
        "city": "Los Angeles",
        "state": "California",
        "population": 3694820,
        "query": "Los Angeles, California"
    },
    {
        "city": "San Diego ",
        "state": "California",
        "population": 1223400,
        "query": "San Diego, California"
    },
    {
        "city": "San Jose ",
        "state": "California",
        "population": 894943,
        "query": "San Jose, California"
    },
    {
        "city": "San Francisco ",
        "state": "California",
        "population": 776733,
        "query": "San Francisco, California"
    },
    {
        "city": "Long Beach ",
        "state": "California",
        "population": 461522,
        "query": "Long Beach, California"
    },
    {
        "city": "Fresno ",
        "state": "California",
        "population": 427652,
        "query": "Fresno, California"
    },
    {
        "city": "Sacramento ",
        "state": "California",
        "population": 407018,
        "query": "Sacramento, California"
    },
    {
        "city": "Oakland ",
        "state": "California",
        "population": 399484,
        "query": "Oakland, California"
    },
    {
        "city": "Santa Ana ",
        "state": "California",
        "population": 337977,
        "query": "Santa Ana, California"
    },
    {
        "city": "Anaheim ",
        "state": "California",
        "population": 328014,
        "query": "Anaheim, California"
    },
    {
        "city": "Riverside ",
        "state": "California",
        "population": 255166,
        "query": "Riverside, California"
    },
    {
        "city": "Bakersfield ",
        "state": "California",
        "population": 247057,
        "query": "Bakersfield, California"
    },
    {
        "city": "Stockton ",
        "state": "California",
        "population": 243771,
        "query": "Stockton, California"
    },
    {
        "city": "Fremont ",
        "state": "California",
        "population": 203413,
        "query": "Fremont, California"
    },
    {
        "city": "Glendale ",
        "state": "California",
        "population": 194973,
        "query": "Glendale, California"
    },
    {
        "city": "Huntington Beach ",
        "state": "California",
        "population": 189594,
        "query": "Huntington Beach, California"
    },
    {
        "city": "Modesto ",
        "state": "California",
        "population": 188856,
        "query": "Modesto, California"
    },
    {
        "city": "San Bernardino ",
        "state": "California",
        "population": 185401,
        "query": "San Bernardino, California"
    },
    {
        "city": "Chula Vista ",
        "state": "California",
        "population": 173556,
        "query": "Chula Vista, California"
    },
    {
        "city": "Oxnard ",
        "state": "California",
        "population": 170358,
        "query": "Oxnard, California"
    },
    {
        "city": "Garden Grove ",
        "state": "California",
        "population": 165196,
        "query": "Garden Grove, California"
    },
    {
        "city": "Oceanside ",
        "state": "California",
        "population": 161029,
        "query": "Oceanside, California"
    },
    {
        "city": "Ontario ",
        "state": "California",
        "population": 158007,
        "query": "Ontario, California"
    },
    {
        "city": "Santa Clarita ",
        "state": "California",
        "population": 151088,
        "query": "Santa Clarita, California"
    },
    {
        "city": "Salinas ",
        "state": "California",
        "population": 151060,
        "query": "Salinas, California"
    },
    {
        "city": "Pomona ",
        "state": "California",
        "population": 149473,
        "query": "Pomona, California"
    },
    {
        "city": "Santa Rosa ",
        "state": "California",
        "population": 147595,
        "query": "Santa Rosa, California"
    },
    {
        "city": "Irvine ",
        "state": "California",
        "population": 143072,
        "query": "Irvine, California"
    },
    {
        "city": "Moreno Valley ",
        "state": "California",
        "population": 142381,
        "query": "Moreno Valley, California"
    },
    {
        "city": "Hayward ",
        "state": "California",
        "population": 140030,
        "query": "Hayward, California"
    },
    {
        "city": "Torrance ",
        "state": "California",
        "population": 137946,
        "query": "Torrance, California"
    },
    {
        "city": "Pasadena ",
        "state": "California",
        "population": 133936,
        "query": "Pasadena, California"
    },
    {
        "city": "Escondido ",
        "state": "California",
        "population": 133559,
        "query": "Escondido, California"
    },
    {
        "city": "Sunnyvale ",
        "state": "California",
        "population": 131760,
        "query": "Sunnyvale, California"
    },
    {
        "city": "Fontana ",
        "state": "California",
        "population": 128929,
        "query": "Fontana, California"
    },
    {
        "city": "Orange ",
        "state": "California",
        "population": 128821,
        "query": "Orange, California"
    },
    {
        "city": "Rancho Cucamonga ",
        "state": "California",
        "population": 127743,
        "query": "Rancho Cucamonga, California"
    },
    {
        "city": "Fullerton ",
        "state": "California",
        "population": 126003,
        "query": "Fullerton, California"
    },
    {
        "city": "Corona ",
        "state": "California",
        "population": 124966,
        "query": "Corona, California"
    },
    {
        "city": "Concord ",
        "state": "California",
        "population": 121780,
        "query": "Concord, California"
    },
    {
        "city": "Lancaster ",
        "state": "California",
        "population": 118718,
        "query": "Lancaster, California"
    },
    {
        "city": "Thousand Oaks ",
        "state": "California",
        "population": 117005,
        "query": "Thousand Oaks, California"
    },
    {
        "city": "Vallejo ",
        "state": "California",
        "population": 116760,
        "query": "Vallejo, California"
    },
    {
        "city": "Palmdale ",
        "state": "California",
        "population": 116670,
        "query": "Palmdale, California"
    },
    {
        "city": "El Monte ",
        "state": "California",
        "population": 115965,
        "query": "El Monte, California"
    },
    {
        "city": "Inglewood ",
        "state": "California",
        "population": 112580,
        "query": "Inglewood, California"
    },
    {
        "city": "Simi Valley ",
        "state": "California",
        "population": 111351,
        "query": "Simi Valley, California"
    },
    {
        "city": "Costa Mesa ",
        "state": "California",
        "population": 108724,
        "query": "Costa Mesa, California"
    },
    {
        "city": "Downey ",
        "state": "California",
        "population": 107323,
        "query": "Downey, California"
    },
    {
        "city": "West Covina ",
        "state": "California",
        "population": 105080,
        "query": "West Covina, California"
    },
    {
        "city": "Daly  ",
        "state": "California",
        "population": 103621,
        "query": "Daly, California"
    },
    {
        "city": "Norwalk ",
        "state": "California",
        "population": 103298,
        "query": "Norwalk, California"
    },
    {
        "city": "Berkeley ",
        "state": "California",
        "population": 102743,
        "query": "Berkeley, California"
    },
    {
        "city": "Santa Clara ",
        "state": "California",
        "population": 102361,
        "query": "Santa Clara, California"
    },
    {
        "city": "San Buenaventura (Ventura) ",
        "state": "California",
        "population": 100916,
        "query": "San Buenaventura (Ventura), California"
    },
    {
        "city": "Burbank ",
        "state": "California",
        "population": 100316,
        "query": "Burbank, California"
    },
    {
        "city": "Richmond ",
        "state": "California",
        "population": 99216,
        "query": "Richmond, California"
    },
    {
        "city": "South Gate ",
        "state": "California",
        "population": 96375,
        "query": "South Gate, California"
    },
    {
        "city": "Fairfield ",
        "state": "California",
        "population": 96178,
        "query": "Fairfield, California"
    },
    {
        "city": "El Cajon ",
        "state": "California",
        "population": 94869,
        "query": "El Cajon, California"
    },
    {
        "city": "Compton ",
        "state": "California",
        "population": 93493,
        "query": "Compton, California"
    },
    {
        "city": "Mission Viejo ",
        "state": "California",
        "population": 93102,
        "query": "Mission Viejo, California"
    },
    {
        "city": "San Mateo ",
        "state": "California",
        "population": 92482,
        "query": "San Mateo, California"
    },
    {
        "city": "Santa Barbara ",
        "state": "California",
        "population": 92325,
        "query": "Santa Barbara, California"
    },
    {
        "city": "Rialto ",
        "state": "California",
        "population": 91873,
        "query": "Rialto, California"
    },
    {
        "city": "Visalia ",
        "state": "California",
        "population": 91565,
        "query": "Visalia, California"
    },
    {
        "city": "Antioch ",
        "state": "California",
        "population": 90532,
        "query": "Antioch, California"
    },
    {
        "city": "Vista ",
        "state": "California",
        "population": 89857,
        "query": "Vista, California"
    },
    {
        "city": "Carson ",
        "state": "California",
        "population": 89730,
        "query": "Carson, California"
    },
    {
        "city": "Vacaville ",
        "state": "California",
        "population": 88625,
        "query": "Vacaville, California"
    },
    {
        "city": "Westminster ",
        "state": "California",
        "population": 88207,
        "query": "Westminster, California"
    },
    {
        "city": "Alhambra ",
        "state": "California",
        "population": 85804,
        "query": "Alhambra, California"
    },
    {
        "city": "Citrus Heights ",
        "state": "California",
        "population": 85071,
        "query": "Citrus Heights, California"
    },
    {
        "city": "Hawthorne ",
        "state": "California",
        "population": 84112,
        "query": "Hawthorne, California"
    },
    {
        "city": "Santa Monica ",
        "state": "California",
        "population": 84084,
        "query": "Santa Monica, California"
    },
    {
        "city": "Whittier ",
        "state": "California",
        "population": 83680,
        "query": "Whittier, California"
    },
    {
        "city": "Redding ",
        "state": "California",
        "population": 80865,
        "query": "Redding, California"
    },
    {
        "city": "Roseville ",
        "state": "California",
        "population": 79921,
        "query": "Roseville, California"
    },
    {
        "city": "San Leandro ",
        "state": "California",
        "population": 79452,
        "query": "San Leandro, California"
    },
    {
        "city": "Lakewood ",
        "state": "California",
        "population": 79345,
        "query": "Lakewood, California"
    },
    {
        "city": "Buena Park ",
        "state": "California",
        "population": 78282,
        "query": "Buena Park, California"
    },
    {
        "city": "Carlsbad ",
        "state": "California",
        "population": 78247,
        "query": "Carlsbad, California"
    },
    {
        "city": "Santa Maria ",
        "state": "California",
        "population": 77423,
        "query": "Santa Maria, California"
    },
    {
        "city": "Baldwin Park ",
        "state": "California",
        "population": 75837,
        "query": "Baldwin Park, California"
    },
    {
        "city": "Redwood  ",
        "state": "California",
        "population": 75402,
        "query": "Redwood, California"
    },
    {
        "city": "Livermore ",
        "state": "California",
        "population": 73345,
        "query": "Livermore, California"
    },
    {
        "city": "Bellflower ",
        "state": "California",
        "population": 72878,
        "query": "Bellflower, California"
    },
    {
        "city": "Napa ",
        "state": "California",
        "population": 72585,
        "query": "Napa, California"
    },
    {
        "city": "Alameda ",
        "state": "California",
        "population": 72259,
        "query": "Alameda, California"
    },
    {
        "city": "Mountain View ",
        "state": "California",
        "population": 70708,
        "query": "Mountain View, California"
    },
    {
        "city": "Newport Beach ",
        "state": "California",
        "population": 70032,
        "query": "Newport Beach, California"
    },
    {
        "city": "Lynwood ",
        "state": "California",
        "population": 69845,
        "query": "Lynwood, California"
    },
    {
        "city": "Clovis ",
        "state": "California",
        "population": 68468,
        "query": "Clovis, California"
    },
    {
        "city": "Upland ",
        "state": "California",
        "population": 68393,
        "query": "Upland, California"
    },
    {
        "city": "Tustin ",
        "state": "California",
        "population": 67504,
        "query": "Tustin, California"
    },
    {
        "city": "Chino ",
        "state": "California",
        "population": 67168,
        "query": "Chino, California"
    },
    {
        "city": "Union  ",
        "state": "California",
        "population": 66869,
        "query": "Union, California"
    },
    {
        "city": "Chino Hills ",
        "state": "California",
        "population": 66787,
        "query": "Chino Hills, California"
    },
    {
        "city": "Walnut Creek ",
        "state": "California",
        "population": 64296,
        "query": "Walnut Creek, California"
    },
    {
        "city": "Victorville ",
        "state": "California",
        "population": 64029,
        "query": "Victorville, California"
    },
    {
        "city": "Merced ",
        "state": "California",
        "population": 63893,
        "query": "Merced, California"
    },
    {
        "city": "Pleasanton ",
        "state": "California",
        "population": 63654,
        "query": "Pleasanton, California"
    },
    {
        "city": "Redlands ",
        "state": "California",
        "population": 63591,
        "query": "Redlands, California"
    },
    {
        "city": "Pico Rivera ",
        "state": "California",
        "population": 63428,
        "query": "Pico Rivera, California"
    },
    {
        "city": "Redondo Beach ",
        "state": "California",
        "population": 63261,
        "query": "Redondo Beach, California"
    },
    {
        "city": "Milpitas ",
        "state": "California",
        "population": 62698,
        "query": "Milpitas, California"
    },
    {
        "city": "Hesperia ",
        "state": "California",
        "population": 62582,
        "query": "Hesperia, California"
    },
    {
        "city": "Montebello ",
        "state": "California",
        "population": 62150,
        "query": "Montebello, California"
    },
    {
        "city": "Laguna Niguel ",
        "state": "California",
        "population": 61891,
        "query": "Laguna Niguel, California"
    },
    {
        "city": "Huntington Park ",
        "state": "California",
        "population": 61348,
        "query": "Huntington Park, California"
    },
    {
        "city": "South San Francisco ",
        "state": "California",
        "population": 60552,
        "query": "South San Francisco, California"
    },
    {
        "city": "Davis ",
        "state": "California",
        "population": 60308,
        "query": "Davis, California"
    },
    {
        "city": "Monterey Park ",
        "state": "California",
        "population": 60051,
        "query": "Monterey Park, California"
    },
    {
        "city": "Chico ",
        "state": "California",
        "population": 59954,
        "query": "Chico, California"
    },
    {
        "city": "La Habra ",
        "state": "California",
        "population": 58974,
        "query": "La Habra, California"
    },
    {
        "city": "Yorba Linda ",
        "state": "California",
        "population": 58918,
        "query": "Yorba Linda, California"
    },
    {
        "city": "Hemet ",
        "state": "California",
        "population": 58812,
        "query": "Hemet, California"
    },
    {
        "city": "Lake Forest ",
        "state": "California",
        "population": 58707,
        "query": "Lake Forest, California"
    },
    {
        "city": "Palo Alto ",
        "state": "California",
        "population": 58598,
        "query": "Palo Alto, California"
    },
    {
        "city": "Encinitas ",
        "state": "California",
        "population": 58014,
        "query": "Encinitas, California"
    },
    {
        "city": "Gardena ",
        "state": "California",
        "population": 57746,
        "query": "Gardena, California"
    },
    {
        "city": "Temecula ",
        "state": "California",
        "population": 57716,
        "query": "Temecula, California"
    },
    {
        "city": "Camarillo ",
        "state": "California",
        "population": 57077,
        "query": "Camarillo, California"
    },
    {
        "city": "Lodi ",
        "state": "California",
        "population": 56999,
        "query": "Lodi, California"
    },
    {
        "city": "Tracy ",
        "state": "California",
        "population": 56929,
        "query": "Tracy, California"
    },
    {
        "city": "Pittsburg ",
        "state": "California",
        "population": 56769,
        "query": "Pittsburg, California"
    },
    {
        "city": "Diamond Bar ",
        "state": "California",
        "population": 56287,
        "query": "Diamond Bar, California"
    },
    {
        "city": "San Rafael ",
        "state": "California",
        "population": 56063,
        "query": "San Rafael, California"
    },
    {
        "city": "Turlock ",
        "state": "California",
        "population": 55810,
        "query": "Turlock, California"
    },
    {
        "city": "Paramount ",
        "state": "California",
        "population": 55266,
        "query": "Paramount, California"
    },
    {
        "city": "Fountain Valley ",
        "state": "California",
        "population": 54978,
        "query": "Fountain Valley, California"
    },
    {
        "city": "San Marcos ",
        "state": "California",
        "population": 54977,
        "query": "San Marcos, California"
    },
    {
        "city": "La Mesa ",
        "state": "California",
        "population": 54749,
        "query": "La Mesa, California"
    },
    {
        "city": "Santa Cruz ",
        "state": "California",
        "population": 54593,
        "query": "Santa Cruz, California"
    },
    {
        "city": "Petaluma ",
        "state": "California",
        "population": 54548,
        "query": "Petaluma, California"
    },
    {
        "city": "National  ",
        "state": "California",
        "population": 54260,
        "query": "National, California"
    },
    {
        "city": "Apple Valley town",
        "state": "California",
        "population": 54239,
        "query": "Apple Valley town, California"
    },
    {
        "city": "Rosemead ",
        "state": "California",
        "population": 53505,
        "query": "Rosemead, California"
    },
    {
        "city": "Arcadia ",
        "state": "California",
        "population": 53054,
        "query": "Arcadia, California"
    },
    {
        "city": "Santee ",
        "state": "California",
        "population": 52975,
        "query": "Santee, California"
    },
    {
        "city": "Folsom ",
        "state": "California",
        "population": 51884,
        "query": "Folsom, California"
    },
    {
        "city": "Cerritos ",
        "state": "California",
        "population": 51488,
        "query": "Cerritos, California"
    },
    {
        "city": "Cupertino ",
        "state": "California",
        "population": 50546,
        "query": "Cupertino, California"
    },
    {
        "city": "Denver ",
        "state": "Colorado",
        "population": 554636,
        "query": "Denver, Colorado"
    },
    {
        "city": "Colorado Springs ",
        "state": "Colorado",
        "population": 360890,
        "query": "Colorado Springs, Colorado"
    },
    {
        "city": "Aurora CO ",
        "state": "Colorado",
        "population": 276393,
        "query": "Aurora CO, Colorado"
    },
    {
        "city": "Lakewood ",
        "state": "Colorado",
        "population": 144126,
        "query": "Lakewood, Colorado"
    },
    {
        "city": "Fort Collins ",
        "state": "Colorado",
        "population": 118652,
        "query": "Fort Collins, Colorado"
    },
    {
        "city": "Arvada ",
        "state": "Colorado",
        "population": 102153,
        "query": "Arvada, Colorado"
    },
    {
        "city": "Pueblo ",
        "state": "Colorado",
        "population": 102121,
        "query": "Pueblo, Colorado"
    },
    {
        "city": "Westminster ",
        "state": "Colorado",
        "population": 100940,
        "query": "Westminster, Colorado"
    },
    {
        "city": "Boulder ",
        "state": "Colorado",
        "population": 94673,
        "query": "Boulder, Colorado"
    },
    {
        "city": "Thornton ",
        "state": "Colorado",
        "population": 82384,
        "query": "Thornton, Colorado"
    },
    {
        "city": "Greeley ",
        "state": "Colorado",
        "population": 76930,
        "query": "Greeley, Colorado"
    },
    {
        "city": "Longmont ",
        "state": "Colorado",
        "population": 71093,
        "query": "Longmont, Colorado"
    },
    {
        "city": "Loveland ",
        "state": "Colorado",
        "population": 50608,
        "query": "Loveland, Colorado"
    },
    {
        "city": "Bridgeport ",
        "state": "Connecticut",
        "population": 139529,
        "query": "Bridgeport, Connecticut"
    },
    {
        "city": "New Haven ",
        "state": "Connecticut",
        "population": 123626,
        "query": "New Haven, Connecticut"
    },
    {
        "city": "Hartford ",
        "state": "Connecticut",
        "population": 121578,
        "query": "Hartford, Connecticut"
    },
    {
        "city": "Stamford ",
        "state": "Connecticut",
        "population": 117083,
        "query": "Stamford, Connecticut"
    },
    {
        "city": "Waterbury ",
        "state": "Connecticut",
        "population": 107271,
        "query": "Waterbury, Connecticut"
    },
    {
        "city": "Norwalk ",
        "state": "Connecticut",
        "population": 82951,
        "query": "Norwalk, Connecticut"
    },
    {
        "city": "Danbury ",
        "state": "Connecticut",
        "population": 74848,
        "query": "Danbury, Connecticut"
    },
    {
        "city": "New Britain ",
        "state": "Connecticut",
        "population": 71538,
        "query": "New Britain, Connecticut"
    },
    {
        "city": "Bristol ",
        "state": "Connecticut",
        "population": 60062,
        "query": "Bristol, Connecticut"
    },
    {
        "city": "Meriden ",
        "state": "Connecticut",
        "population": 58244,
        "query": "Meriden, Connecticut"
    },
    {
        "city": "West Haven ",
        "state": "Connecticut",
        "population": 52360,
        "query": "West Haven, Connecticut"
    },
    {
        "city": "Milford ",
        "state": "Connecticut",
        "population": 50594,
        "query": "Milford, Connecticut"
    },
    {
        "city": "Washington ",
        "state": "DC",
        "population": 572059,
        "query": "Washington, DC"
    },
    {
        "city": "Wilmington ",
        "state": "Delaware",
        "population": 72664,
        "query": "Wilmington, Delaware"
    },
    {
        "city": "Jacksonville ",
        "state": "Florida",
        "population": 735617,
        "query": "Jacksonville, Florida"
    },
    {
        "city": "Miami ",
        "state": "Florida",
        "population": 362470,
        "query": "Miami, Florida"
    },
    {
        "city": "Tampa ",
        "state": "Florida",
        "population": 303447,
        "query": "Tampa, Florida"
    },
    {
        "city": "St. Petersburg ",
        "state": "Florida",
        "population": 248232,
        "query": "St. Petersburg, Florida"
    },
    {
        "city": "Hialeah ",
        "state": "Florida",
        "population": 226419,
        "query": "Hialeah, Florida"
    },
    {
        "city": "Orlando ",
        "state": "Florida",
        "population": 185951,
        "query": "Orlando, Florida"
    },
    {
        "city": "Fort Lauderdale ",
        "state": "Florida",
        "population": 152397,
        "query": "Fort Lauderdale, Florida"
    },
    {
        "city": "Tallahassee ",
        "state": "Florida",
        "population": 150624,
        "query": "Tallahassee, Florida"
    },
    {
        "city": "Hollywood ",
        "state": "Florida",
        "population": 139357,
        "query": "Hollywood, Florida"
    },
    {
        "city": "Pembroke Pines ",
        "state": "Florida",
        "population": 137427,
        "query": "Pembroke Pines, Florida"
    },
    {
        "city": "Coral Springs ",
        "state": "Florida",
        "population": 117549,
        "query": "Coral Springs, Florida"
    },
    {
        "city": "Clearwater ",
        "state": "Florida",
        "population": 108787,
        "query": "Clearwater, Florida"
    },
    {
        "city": "Cape Coral ",
        "state": "Florida",
        "population": 102286,
        "query": "Cape Coral, Florida"
    },
    {
        "city": "Gainesville ",
        "state": "Florida",
        "population": 95447,
        "query": "Gainesville, Florida"
    },
    {
        "city": "Port St. Lucie ",
        "state": "Florida",
        "population": 88769,
        "query": "Port St. Lucie, Florida"
    },
    {
        "city": "Miami Beach ",
        "state": "Florida",
        "population": 87933,
        "query": "Miami Beach, Florida"
    },
    {
        "city": "Sunrise ",
        "state": "Florida",
        "population": 85779,
        "query": "Sunrise, Florida"
    },
    {
        "city": "Plantation ",
        "state": "Florida",
        "population": 82934,
        "query": "Plantation, Florida"
    },
    {
        "city": "West Palm Beach ",
        "state": "Florida",
        "population": 82103,
        "query": "West Palm Beach, Florida"
    },
    {
        "city": "Palm Bay ",
        "state": "Florida",
        "population": 79413,
        "query": "Palm Bay, Florida"
    },
    {
        "city": "Lakeland ",
        "state": "Florida",
        "population": 78452,
        "query": "Lakeland, Florida"
    },
    {
        "city": "Pompano Beach ",
        "state": "Florida",
        "population": 78191,
        "query": "Pompano Beach, Florida"
    },
    {
        "city": "Davie town",
        "state": "Florida",
        "population": 75720,
        "query": "Davie town, Florida"
    },
    {
        "city": "Boca Raton ",
        "state": "Florida",
        "population": 74764,
        "query": "Boca Raton, Florida"
    },
    {
        "city": "Miramar ",
        "state": "Florida",
        "population": 72739,
        "query": "Miramar, Florida"
    },
    {
        "city": "Melbourne ",
        "state": "Florida",
        "population": 71382,
        "query": "Melbourne, Florida"
    },
    {
        "city": "Deltona ",
        "state": "Florida",
        "population": 69543,
        "query": "Deltona, Florida"
    },
    {
        "city": "Largo ",
        "state": "Florida",
        "population": 69371,
        "query": "Largo, Florida"
    },
    {
        "city": "Deerfield Beach ",
        "state": "Florida",
        "population": 64583,
        "query": "Deerfield Beach, Florida"
    },
    {
        "city": "Daytona Beach ",
        "state": "Florida",
        "population": 64112,
        "query": "Daytona Beach, Florida"
    },
    {
        "city": "Boynton Beach ",
        "state": "Florida",
        "population": 60389,
        "query": "Boynton Beach, Florida"
    },
    {
        "city": "Delray Beach ",
        "state": "Florida",
        "population": 60020,
        "query": "Delray Beach, Florida"
    },
    {
        "city": "North Miami ",
        "state": "Florida",
        "population": 59880,
        "query": "North Miami, Florida"
    },
    {
        "city": "Lauderhill ",
        "state": "Florida",
        "population": 57585,
        "query": "Lauderhill, Florida"
    },
    {
        "city": "Pensacola ",
        "state": "Florida",
        "population": 56255,
        "query": "Pensacola, Florida"
    },
    {
        "city": "Tamarac ",
        "state": "Florida",
        "population": 55588,
        "query": "Tamarac, Florida"
    },
    {
        "city": "Margate ",
        "state": "Florida",
        "population": 53909,
        "query": "Margate, Florida"
    },
    {
        "city": "Sarasota ",
        "state": "Florida",
        "population": 52715,
        "query": "Sarasota, Florida"
    },
    {
        "city": "Atlanta ",
        "state": "Georgia",
        "population": 416474,
        "query": "Atlanta, Georgia"
    },
    {
        "city": "Augusta ",
        "state": "Georgia",
        "population": 195182,
        "query": "Augusta, Georgia"
    },
    {
        "city": "Columbus ",
        "state": "Georgia",
        "population": 185781,
        "query": "Columbus, Georgia"
    },
    {
        "city": "Savannah ",
        "state": "Georgia",
        "population": 131510,
        "query": "Savannah, Georgia"
    },
    {
        "city": "Athens ",
        "state": "Georgia",
        "population": 100266,
        "query": "Athens, Georgia"
    },
    {
        "city": "Macon ",
        "state": "Georgia",
        "population": 97255,
        "query": "Macon, Georgia"
    },
    {
        "city": "Roswell ",
        "state": "Georgia",
        "population": 79334,
        "query": "Roswell, Georgia"
    },
    {
        "city": "Albany GA ",
        "state": "Georgia",
        "population": 76939,
        "query": "Albany GA, Georgia"
    },
    {
        "city": "Marietta ",
        "state": "Georgia",
        "population": 58748,
        "query": "Marietta, Georgia"
    },
    {
        "city": "Boise  ",
        "state": "Idaho",
        "population": 185787,
        "query": "Boise, Idaho"
    },
    {
        "city": "Nampa ",
        "state": "Idaho",
        "population": 51867,
        "query": "Nampa, Idaho"
    },
    {
        "city": "Pocatello ",
        "state": "Idaho",
        "population": 51466,
        "query": "Pocatello, Idaho"
    },
    {
        "city": "Idaho Falls ",
        "state": "Idaho",
        "population": 50730,
        "query": "Idaho Falls, Idaho"
    },
    {
        "city": "Chicago ",
        "state": "Illinois",
        "population": 2896016,
        "query": "Chicago, Illinois"
    },
    {
        "city": "Rockford ",
        "state": "Illinois",
        "population": 150115,
        "query": "Rockford, Illinois"
    },
    {
        "city": "Aurora IL ",
        "state": "Illinois",
        "population": 142990,
        "query": "Aurora IL, Illinois"
    },
    {
        "city": "Naperville ",
        "state": "Illinois",
        "population": 128358,
        "query": "Naperville, Illinois"
    },
    {
        "city": "Peoria ",
        "state": "Illinois",
        "population": 112936,
        "query": "Peoria, Illinois"
    },
    {
        "city": "Springfield ",
        "state": "Illinois",
        "population": 111454,
        "query": "Springfield, Illinois"
    },
    {
        "city": "Joliet ",
        "state": "Illinois",
        "population": 106221,
        "query": "Joliet, Illinois"
    },
    {
        "city": "Elgin ",
        "state": "Illinois",
        "population": 94487,
        "query": "Elgin, Illinois"
    },
    {
        "city": "Waukegan ",
        "state": "Illinois",
        "population": 87901,
        "query": "Waukegan, Illinois"
    },
    {
        "city": "Cicero town",
        "state": "Illinois",
        "population": 85616,
        "query": "Cicero town, Illinois"
    },
    {
        "city": "Decatur ",
        "state": "Illinois",
        "population": 81860,
        "query": "Decatur, Illinois"
    },
    {
        "city": "Arlington Heights village",
        "state": "Illinois",
        "population": 76031,
        "query": "Arlington Heights village, Illinois"
    },
    {
        "city": "Schaumburg village",
        "state": "Illinois",
        "population": 75386,
        "query": "Schaumburg village, Illinois"
    },
    {
        "city": "Evanston ",
        "state": "Illinois",
        "population": 74239,
        "query": "Evanston, Illinois"
    },
    {
        "city": "Champaign ",
        "state": "Illinois",
        "population": 67518,
        "query": "Champaign, Illinois"
    },
    {
        "city": "Palatine village",
        "state": "Illinois",
        "population": 65479,
        "query": "Palatine village, Illinois"
    },
    {
        "city": "Bloomington IL ",
        "state": "Illinois",
        "population": 64808,
        "query": "Bloomington IL, Illinois"
    },
    {
        "city": "Skokie village",
        "state": "Illinois",
        "population": 63348,
        "query": "Skokie village, Illinois"
    },
    {
        "city": "Des Plaines ",
        "state": "Illinois",
        "population": 58720,
        "query": "Des Plaines, Illinois"
    },
    {
        "city": "Bolingbrook village",
        "state": "Illinois",
        "population": 56321,
        "query": "Bolingbrook village, Illinois"
    },
    {
        "city": "Mount Prospect village",
        "state": "Illinois",
        "population": 56265,
        "query": "Mount Prospect village, Illinois"
    },
    {
        "city": "Wheaton ",
        "state": "Illinois",
        "population": 55416,
        "query": "Wheaton, Illinois"
    },
    {
        "city": "Oak Lawn village",
        "state": "Illinois",
        "population": 55245,
        "query": "Oak Lawn village, Illinois"
    },
    {
        "city": "Berwyn ",
        "state": "Illinois",
        "population": 54016,
        "query": "Berwyn, Illinois"
    },
    {
        "city": "Oak Park village",
        "state": "Illinois",
        "population": 52524,
        "query": "Oak Park village, Illinois"
    },
    {
        "city": "Orland Park village",
        "state": "Illinois",
        "population": 51077,
        "query": "Orland Park village, Illinois"
    },
    {
        "city": "Indianapolis ",
        "state": "Indiana",
        "population": 781870,
        "query": "Indianapolis, Indiana"
    },
    {
        "city": "Fort Wayne ",
        "state": "Indiana",
        "population": 205727,
        "query": "Fort Wayne, Indiana"
    },
    {
        "city": "Evansville ",
        "state": "Indiana",
        "population": 121582,
        "query": "Evansville, Indiana"
    },
    {
        "city": "South Bend ",
        "state": "Indiana",
        "population": 107789,
        "query": "South Bend, Indiana"
    },
    {
        "city": "Gary ",
        "state": "Indiana",
        "population": 102746,
        "query": "Gary, Indiana"
    },
    {
        "city": "Hammond ",
        "state": "Indiana",
        "population": 83048,
        "query": "Hammond, Indiana"
    },
    {
        "city": "Bloomington IN ",
        "state": "Indiana",
        "population": 69291,
        "query": "Bloomington IN, Indiana"
    },
    {
        "city": "Muncie ",
        "state": "Indiana",
        "population": 67430,
        "query": "Muncie, Indiana"
    },
    {
        "city": "Anderson ",
        "state": "Indiana",
        "population": 59734,
        "query": "Anderson, Indiana"
    },
    {
        "city": "Terre Haute ",
        "state": "Indiana",
        "population": 59614,
        "query": "Terre Haute, Indiana"
    },
    {
        "city": "Lafayette ",
        "state": "Indiana",
        "population": 56397,
        "query": "Lafayette, Indiana"
    },
    {
        "city": "Elkhart ",
        "state": "Indiana",
        "population": 51874,
        "query": "Elkhart, Indiana"
    },
    {
        "city": "Des Moines ",
        "state": "Iowa",
        "population": 198682,
        "query": "Des Moines, Iowa"
    },
    {
        "city": "Cedar Rapids ",
        "state": "Iowa",
        "population": 120758,
        "query": "Cedar Rapids, Iowa"
    },
    {
        "city": "Davenport ",
        "state": "Iowa",
        "population": 98359,
        "query": "Davenport, Iowa"
    },
    {
        "city": "Sioux  ",
        "state": "Iowa",
        "population": 85013,
        "query": "Sioux, Iowa"
    },
    {
        "city": "Waterloo ",
        "state": "Iowa",
        "population": 68747,
        "query": "Waterloo, Iowa"
    },
    {
        "city": "Iowa  ",
        "state": "Iowa",
        "population": 62220,
        "query": "Iowa, Iowa"
    },
    {
        "city": "Council Bluffs ",
        "state": "Iowa",
        "population": 58268,
        "query": "Council Bluffs, Iowa"
    },
    {
        "city": "Dubuque ",
        "state": "Iowa",
        "population": 57686,
        "query": "Dubuque, Iowa"
    },
    {
        "city": "Ames ",
        "state": "Iowa",
        "population": 50731,
        "query": "Ames, Iowa"
    },
    {
        "city": "Wichita ",
        "state": "Kansas",
        "population": 344284,
        "query": "Wichita, Kansas"
    },
    {
        "city": "Overland Park ",
        "state": "Kansas",
        "population": 149080,
        "query": "Overland Park, Kansas"
    },
    {
        "city": "Kansas  ",
        "state": "Kansas",
        "population": 146866,
        "query": "Kansas, Kansas"
    },
    {
        "city": "Topeka ",
        "state": "Kansas",
        "population": 122377,
        "query": "Topeka, Kansas"
    },
    {
        "city": "Olathe ",
        "state": "Kansas",
        "population": 92962,
        "query": "Olathe, Kansas"
    },
    {
        "city": "Lawrence ",
        "state": "Kansas",
        "population": 80098,
        "query": "Lawrence, Kansas"
    },
    {
        "city": "Lexington-Fayette",
        "state": "Kentucky",
        "population": 260512,
        "query": "Lexington-Fayette, Kentucky"
    },
    {
        "city": "Louisville ",
        "state": "Kentucky",
        "population": 256231,
        "query": "Louisville, Kentucky"
    },
    {
        "city": "Owensboro ",
        "state": "Kentucky",
        "population": 54067,
        "query": "Owensboro, Kentucky"
    },
    {
        "city": "New Orleans ",
        "state": "Louisiana",
        "population": 484674,
        "query": "New Orleans, Louisiana"
    },
    {
        "city": "Baton Rouge ",
        "state": "Louisiana",
        "population": 227818,
        "query": "Baton Rouge, Louisiana"
    },
    {
        "city": "Shreveport ",
        "state": "Louisiana",
        "population": 200145,
        "query": "Shreveport, Louisiana"
    },
    {
        "city": "Lafayette ",
        "state": "Louisiana",
        "population": 110257,
        "query": "Lafayette, Louisiana"
    },
    {
        "city": "Lake Charles ",
        "state": "Louisiana",
        "population": 71757,
        "query": "Lake Charles, Louisiana"
    },
    {
        "city": "Kenner ",
        "state": "Louisiana",
        "population": 70517,
        "query": "Kenner, Louisiana"
    },
    {
        "city": "Bossier  ",
        "state": "Louisiana",
        "population": 56461,
        "query": "Bossier, Louisiana"
    },
    {
        "city": "Monroe ",
        "state": "Louisiana",
        "population": 53107,
        "query": "Monroe, Louisiana"
    },
    {
        "city": "Portland ",
        "state": "Maine",
        "population": 64249,
        "query": "Portland, Maine"
    },
    {
        "city": "Baltimore ",
        "state": "Maryland",
        "population": 651154,
        "query": "Baltimore, Maryland"
    },
    {
        "city": "Frederick ",
        "state": "Maryland",
        "population": 52767,
        "query": "Frederick, Maryland"
    },
    {
        "city": "Gaithersburg ",
        "state": "Maryland",
        "population": 52613,
        "query": "Gaithersburg, Maryland"
    },
    {
        "city": "Bowie ",
        "state": "Maryland",
        "population": 50269,
        "query": "Bowie, Maryland"
    },
    {
        "city": "Boston ",
        "state": "Massachusetts",
        "population": 589141,
        "query": "Boston, Massachusetts"
    },
    {
        "city": "Worcester ",
        "state": "Massachusetts",
        "population": 172648,
        "query": "Worcester, Massachusetts"
    },
    {
        "city": "Springfield ",
        "state": "Massachusetts",
        "population": 152082,
        "query": "Springfield, Massachusetts"
    },
    {
        "city": "Lowell ",
        "state": "Massachusetts",
        "population": 105167,
        "query": "Lowell, Massachusetts"
    },
    {
        "city": "Cambridge ",
        "state": "Massachusetts",
        "population": 101355,
        "query": "Cambridge, Massachusetts"
    },
    {
        "city": "Brockton ",
        "state": "Massachusetts",
        "population": 94304,
        "query": "Brockton, Massachusetts"
    },
    {
        "city": "New Bedford ",
        "state": "Massachusetts",
        "population": 93768,
        "query": "New Bedford, Massachusetts"
    },
    {
        "city": "Fall River ",
        "state": "Massachusetts",
        "population": 91938,
        "query": "Fall River, Massachusetts"
    },
    {
        "city": "Lynn ",
        "state": "Massachusetts",
        "population": 89050,
        "query": "Lynn, Massachusetts"
    },
    {
        "city": "Quincy ",
        "state": "Massachusetts",
        "population": 88025,
        "query": "Quincy, Massachusetts"
    },
    {
        "city": "Newton ",
        "state": "Massachusetts",
        "population": 83829,
        "query": "Newton, Massachusetts"
    },
    {
        "city": "Somerville ",
        "state": "Massachusetts",
        "population": 77478,
        "query": "Somerville, Massachusetts"
    },
    {
        "city": "Lawrence ",
        "state": "Massachusetts",
        "population": 72043,
        "query": "Lawrence, Massachusetts"
    },
    {
        "city": "Waltham ",
        "state": "Massachusetts",
        "population": 59226,
        "query": "Waltham, Massachusetts"
    },
    {
        "city": "Haverhill ",
        "state": "Massachusetts",
        "population": 58969,
        "query": "Haverhill, Massachusetts"
    },
    {
        "city": "Malden ",
        "state": "Massachusetts",
        "population": 56340,
        "query": "Malden, Massachusetts"
    },
    {
        "city": "Taunton ",
        "state": "Massachusetts",
        "population": 55976,
        "query": "Taunton, Massachusetts"
    },
    {
        "city": "Medford ",
        "state": "Massachusetts",
        "population": 55765,
        "query": "Medford, Massachusetts"
    },
    {
        "city": "Chicopee ",
        "state": "Massachusetts",
        "population": 54653,
        "query": "Chicopee, Massachusetts"
    },
    {
        "city": "Detroit ",
        "state": "Michigan",
        "population": 951270,
        "query": "Detroit, Michigan"
    },
    {
        "city": "Grand Rapids ",
        "state": "Michigan",
        "population": 197800,
        "query": "Grand Rapids, Michigan"
    },
    {
        "city": "Warren ",
        "state": "Michigan",
        "population": 138247,
        "query": "Warren, Michigan"
    },
    {
        "city": "Flint ",
        "state": "Michigan",
        "population": 124943,
        "query": "Flint, Michigan"
    },
    {
        "city": "Sterling Heights ",
        "state": "Michigan",
        "population": 124471,
        "query": "Sterling Heights, Michigan"
    },
    {
        "city": "Lansing ",
        "state": "Michigan",
        "population": 119128,
        "query": "Lansing, Michigan"
    },
    {
        "city": "Ann Arbor ",
        "state": "Michigan",
        "population": 114024,
        "query": "Ann Arbor, Michigan"
    },
    {
        "city": "Livonia ",
        "state": "Michigan",
        "population": 100545,
        "query": "Livonia, Michigan"
    },
    {
        "city": "Dearborn ",
        "state": "Michigan",
        "population": 97775,
        "query": "Dearborn, Michigan"
    },
    {
        "city": "Westland ",
        "state": "Michigan",
        "population": 86602,
        "query": "Westland, Michigan"
    },
    {
        "city": "Farmington Hills ",
        "state": "Michigan",
        "population": 82111,
        "query": "Farmington Hills, Michigan"
    },
    {
        "city": "Troy ",
        "state": "Michigan",
        "population": 80959,
        "query": "Troy, Michigan"
    },
    {
        "city": "Southfield ",
        "state": "Michigan",
        "population": 78296,
        "query": "Southfield, Michigan"
    },
    {
        "city": "Kalamazoo ",
        "state": "Michigan",
        "population": 77145,
        "query": "Kalamazoo, Michigan"
    },
    {
        "city": "Wyoming ",
        "state": "Michigan",
        "population": 69368,
        "query": "Wyoming, Michigan"
    },
    {
        "city": "Rochester Hills ",
        "state": "Michigan",
        "population": 68825,
        "query": "Rochester Hills, Michigan"
    },
    {
        "city": "Pontiac ",
        "state": "Michigan",
        "population": 66337,
        "query": "Pontiac, Michigan"
    },
    {
        "city": "Taylor ",
        "state": "Michigan",
        "population": 65868,
        "query": "Taylor, Michigan"
    },
    {
        "city": "St. Clair Shores ",
        "state": "Michigan",
        "population": 63096,
        "query": "St. Clair Shores, Michigan"
    },
    {
        "city": "Saginaw ",
        "state": "Michigan",
        "population": 61799,
        "query": "Saginaw, Michigan"
    },
    {
        "city": "Royal Oak ",
        "state": "Michigan",
        "population": 60062,
        "query": "Royal Oak, Michigan"
    },
    {
        "city": "Dearborn Heights ",
        "state": "Michigan",
        "population": 58264,
        "query": "Dearborn Heights, Michigan"
    },
    {
        "city": "Battle Creek ",
        "state": "Michigan",
        "population": 53364,
        "query": "Battle Creek, Michigan"
    },
    {
        "city": "Minneapolis ",
        "state": "Minnesota",
        "population": 382618,
        "query": "Minneapolis, Minnesota"
    },
    {
        "city": "St. Paul ",
        "state": "Minnesota",
        "population": 287151,
        "query": "St. Paul, Minnesota"
    },
    {
        "city": "Duluth ",
        "state": "Minnesota",
        "population": 86918,
        "query": "Duluth, Minnesota"
    },
    {
        "city": "Rochester ",
        "state": "Minnesota",
        "population": 85806,
        "query": "Rochester, Minnesota"
    },
    {
        "city": "Bloomington",
        "state": "Minnesota",
        "population": 85172,
        "query": "Bloomington, Minnesota"
    },
    {
        "city": "Brooklyn Park ",
        "state": "Minnesota",
        "population": 67388,
        "query": "Brooklyn Park, Minnesota"
    },
    {
        "city": "Plymouth ",
        "state": "Minnesota",
        "population": 65894,
        "query": "Plymouth, Minnesota"
    },
    {
        "city": "Eagan ",
        "state": "Minnesota",
        "population": 63557,
        "query": "Eagan, Minnesota"
    },
    {
        "city": "Coon Rapids ",
        "state": "Minnesota",
        "population": 61607,
        "query": "Coon Rapids, Minnesota"
    },
    {
        "city": "Burnsville ",
        "state": "Minnesota",
        "population": 60220,
        "query": "Burnsville, Minnesota"
    },
    {
        "city": "St. Cloud ",
        "state": "Minnesota",
        "population": 59107,
        "query": "St. Cloud, Minnesota"
    },
    {
        "city": "Eden Prairie ",
        "state": "Minnesota",
        "population": 54901,
        "query": "Eden Prairie, Minnesota"
    },
    {
        "city": "Minnetonka ",
        "state": "Minnesota",
        "population": 51301,
        "query": "Minnetonka, Minnesota"
    },
    {
        "city": "Maple Grove ",
        "state": "Minnesota",
        "population": 50365,
        "query": "Maple Grove, Minnesota"
    },
    {
        "city": "Jackson ",
        "state": "Mississippi",
        "population": 184256,
        "query": "Jackson, Mississippi"
    },
    {
        "city": "Gulfport ",
        "state": "Mississippi",
        "population": 71127,
        "query": "Gulfport, Mississippi"
    },
    {
        "city": "Biloxi ",
        "state": "Mississippi",
        "population": 50644,
        "query": "Biloxi, Mississippi"
    },
    {
        "city": "Kansas  ",
        "state": "Missouri",
        "population": 441545,
        "query": "Kansas, Missouri"
    },
    {
        "city": "St. Louis ",
        "state": "Missouri",
        "population": 348189,
        "query": "St. Louis, Missouri"
    },
    {
        "city": "Springfield ",
        "state": "Missouri",
        "population": 151580,
        "query": "Springfield, Missouri"
    },
    {
        "city": "Independence ",
        "state": "Missouri",
        "population": 113288,
        "query": "Independence, Missouri"
    },
    {
        "city": "Columbia ",
        "state": "Missouri",
        "population": 84531,
        "query": "Columbia, Missouri"
    },
    {
        "city": "St. Joseph ",
        "state": "Missouri",
        "population": 73990,
        "query": "St. Joseph, Missouri"
    },
    {
        "city": "Lee's Summit ",
        "state": "Missouri",
        "population": 70700,
        "query": "Lee's Summit, Missouri"
    },
    {
        "city": "St. Charles ",
        "state": "Missouri",
        "population": 60321,
        "query": "St. Charles, Missouri"
    },
    {
        "city": "St. Peters ",
        "state": "Missouri",
        "population": 51381,
        "query": "St. Peters, Missouri"
    },
    {
        "city": "Florissant ",
        "state": "Missouri",
        "population": 50497,
        "query": "Florissant, Missouri"
    },
    {
        "city": "Billings ",
        "state": "Montana",
        "population": 89847,
        "query": "Billings, Montana"
    },
    {
        "city": "Missoula ",
        "state": "Montana",
        "population": 57053,
        "query": "Missoula, Montana"
    },
    {
        "city": "Great Falls ",
        "state": "Montana",
        "population": 56690,
        "query": "Great Falls, Montana"
    },
    {
        "city": "Omaha ",
        "state": "Nebraska",
        "population": 390007,
        "query": "Omaha, Nebraska"
    },
    {
        "city": "Lincoln ",
        "state": "Nebraska",
        "population": 225581,
        "query": "Lincoln, Nebraska"
    },
    {
        "city": "Las Vegas ",
        "state": "Nevada",
        "population": 478434,
        "query": "Las Vegas, Nevada"
    },
    {
        "city": "Reno ",
        "state": "Nevada",
        "population": 180480,
        "query": "Reno, Nevada"
    },
    {
        "city": "Henderson ",
        "state": "Nevada",
        "population": 175381,
        "query": "Henderson, Nevada"
    },
    {
        "city": "North Las Vegas ",
        "state": "Nevada",
        "population": 115488,
        "query": "North Las Vegas, Nevada"
    },
    {
        "city": "Sparks ",
        "state": "Nevada",
        "population": 66346,
        "query": "Sparks, Nevada"
    },
    {
        "city": "Carson ",
        "state": "Nevada",
        "population": 52457,
        "query": "Carson, Nevada"
    },
    {
        "city": "Manchester ",
        "state": "New Hampshire",
        "population": 107006,
        "query": "Manchester, New Hampshire"
    },
    {
        "city": "Nashua ",
        "state": "New Hampshire",
        "population": 86605,
        "query": "Nashua, New Hampshire"
    },
    {
        "city": "Newark ",
        "state": "New Jersey",
        "population": 273546,
        "query": "Newark, New Jersey"
    },
    {
        "city": "Jersey  ",
        "state": "New Jersey",
        "population": 240055,
        "query": "Jersey, New Jersey"
    },
    {
        "city": "Paterson ",
        "state": "New Jersey",
        "population": 149222,
        "query": "Paterson, New Jersey"
    },
    {
        "city": "Elizabeth ",
        "state": "New Jersey",
        "population": 120568,
        "query": "Elizabeth, New Jersey"
    },
    {
        "city": "Trenton ",
        "state": "New Jersey",
        "population": 85403,
        "query": "Trenton, New Jersey"
    },
    {
        "city": "Camden ",
        "state": "New Jersey",
        "population": 79904,
        "query": "Camden, New Jersey"
    },
    {
        "city": "Clifton ",
        "state": "New Jersey",
        "population": 78672,
        "query": "Clifton, New Jersey"
    },
    {
        "city": "East Orange ",
        "state": "New Jersey",
        "population": 69824,
        "query": "East Orange, New Jersey"
    },
    {
        "city": "Passaic ",
        "state": "New Jersey",
        "population": 67861,
        "query": "Passaic, New Jersey"
    },
    {
        "city": "Union  ",
        "state": "New Jersey",
        "population": 67088,
        "query": "Union, New Jersey"
    },
    {
        "city": "Bayonne ",
        "state": "New Jersey",
        "population": 61842,
        "query": "Bayonne, New Jersey"
    },
    {
        "city": "Vineland ",
        "state": "New Jersey",
        "population": 56271,
        "query": "Vineland, New Jersey"
    },
    {
        "city": "Albuquerque ",
        "state": "New Mexico",
        "population": 448607,
        "query": "Albuquerque, New Mexico"
    },
    {
        "city": "Las Cruces ",
        "state": "New Mexico",
        "population": 74267,
        "query": "Las Cruces, New Mexico"
    },
    {
        "city": "Santa Fe ",
        "state": "New Mexico",
        "population": 62203,
        "query": "Santa Fe, New Mexico"
    },
    {
        "city": "Rio Rancho ",
        "state": "New Mexico",
        "population": 51765,
        "query": "Rio Rancho, New Mexico"
    },
    {
        "city": "Long Island",
        "state": "New York",
        "query": "Long Island, New York"
    },
    {
        "city": "Manhattan",
        "state": "New York",
        "query": "Manhattan, New York"
    },
    {
        "city": "Queens",
        "state": "New York",
        "query": "Queens, New York"
    },
    {
        "city": "Bushwick",
        "state": "New York",
        "query": "Bushwick, New York"
    },
    {
        "city": "Williamsburg",
        "state": "New York",
        "query": "Williamsburg, New York"
    },
    {
        "city": "Brooklyn",
        "state": "New York",
        "query": "Brooklyn, New York"
    },
    {
        "city": "New York ",
        "state": "New York",
        "population": 8008278,
        "query": "New York, New York"
    },
    {
        "city": "Buffalo ",
        "state": "New York",
        "population": 292648,
        "query": "Buffalo, New York"
    },
    {
        "city": "Rochester ",
        "state": "New York",
        "population": 219773,
        "query": "Rochester, New York"
    },
    {
        "city": "Yonkers ",
        "state": "New York",
        "population": 196086,
        "query": "Yonkers, New York"
    },
    {
        "city": "Syracuse ",
        "state": "New York",
        "population": 147306,
        "query": "Syracuse, New York"
    },
    {
        "city": "Albany NY ",
        "state": "New York",
        "population": 95658,
        "query": "Albany NY, New York"
    },
    {
        "city": "New Rochelle ",
        "state": "New York",
        "population": 72182,
        "query": "New Rochelle, New York"
    },
    {
        "city": "Mount Vernon ",
        "state": "New York",
        "population": 68381,
        "query": "Mount Vernon, New York"
    },
    {
        "city": "Schenectady ",
        "state": "New York",
        "population": 61821,
        "query": "Schenectady, New York"
    },
    {
        "city": "Utica ",
        "state": "New York",
        "population": 60651,
        "query": "Utica, New York"
    },
    {
        "city": "Hempstead village",
        "state": "New York",
        "population": 56554,
        "query": "Hempstead village, New York"
    },
    {
        "city": "Niagara Falls ",
        "state": "New York",
        "population": 55593,
        "query": "Niagara Falls, New York"
    },
    {
        "city": "White Plains ",
        "state": "New York",
        "population": 53077,
        "query": "White Plains, New York"
    },
    {
        "city": "Charlotte ",
        "state": "North Carolina",
        "population": 540828,
        "query": "Charlotte, North Carolina"
    },
    {
        "city": "Raleigh ",
        "state": "North Carolina",
        "population": 276093,
        "query": "Raleigh, North Carolina"
    },
    {
        "city": "Greensboro ",
        "state": "North Carolina",
        "population": 223891,
        "query": "Greensboro, North Carolina"
    },
    {
        "city": "Durham ",
        "state": "North Carolina",
        "population": 187035,
        "query": "Durham, North Carolina"
    },
    {
        "city": "Winston-Salem ",
        "state": "North Carolina",
        "population": 185776,
        "query": "Winston-Salem, North Carolina"
    },
    {
        "city": "Fayetteville ",
        "state": "North Carolina",
        "population": 121015,
        "query": "Fayetteville, North Carolina"
    },
    {
        "city": "Cary town",
        "state": "North Carolina",
        "population": 94536,
        "query": "Cary town, North Carolina"
    },
    {
        "city": "High Point ",
        "state": "North Carolina",
        "population": 85839,
        "query": "High Point, North Carolina"
    },
    {
        "city": "Wilmington ",
        "state": "North Carolina",
        "population": 75838,
        "query": "Wilmington, North Carolina"
    },
    {
        "city": "Asheville ",
        "state": "North Carolina",
        "population": 68889,
        "query": "Asheville, North Carolina"
    },
    {
        "city": "Jacksonville ",
        "state": "North Carolina",
        "population": 66715,
        "query": "Jacksonville, North Carolina"
    },
    {
        "city": "Gastonia ",
        "state": "North Carolina",
        "population": 66277,
        "query": "Gastonia, North Carolina"
    },
    {
        "city": "Greenville ",
        "state": "North Carolina",
        "population": 60476,
        "query": "Greenville, North Carolina"
    },
    {
        "city": "Concord ",
        "state": "North Carolina",
        "population": 55977,
        "query": "Concord, North Carolina"
    },
    {
        "city": "Rocky Mount ",
        "state": "North Carolina",
        "population": 55893,
        "query": "Rocky Mount, North Carolina"
    },
    {
        "city": "Fargo ",
        "state": "North Dakota",
        "population": 90599,
        "query": "Fargo, North Dakota"
    },
    {
        "city": "Bismarck ",
        "state": "North Dakota",
        "population": 55532,
        "query": "Bismarck, North Dakota"
    },
    {
        "city": "Columbus ",
        "state": "Ohio",
        "population": 711470,
        "query": "Columbus, Ohio"
    },
    {
        "city": "Cleveland ",
        "state": "Ohio",
        "population": 478403,
        "query": "Cleveland, Ohio"
    },
    {
        "city": "Cincinnati ",
        "state": "Ohio",
        "population": 331285,
        "query": "Cincinnati, Ohio"
    },
    {
        "city": "Toledo ",
        "state": "Ohio",
        "population": 313619,
        "query": "Toledo, Ohio"
    },
    {
        "city": "Akron ",
        "state": "Ohio",
        "population": 217074,
        "query": "Akron, Ohio"
    },
    {
        "city": "Dayton ",
        "state": "Ohio",
        "population": 166179,
        "query": "Dayton, Ohio"
    },
    {
        "city": "Parma ",
        "state": "Ohio",
        "population": 85655,
        "query": "Parma, Ohio"
    },
    {
        "city": "Youngstown ",
        "state": "Ohio",
        "population": 82026,
        "query": "Youngstown, Ohio"
    },
    {
        "city": "Canton ",
        "state": "Ohio",
        "population": 80806,
        "query": "Canton, Ohio"
    },
    {
        "city": "Lorain ",
        "state": "Ohio",
        "population": 68652,
        "query": "Lorain, Ohio"
    },
    {
        "city": "Springfield ",
        "state": "Ohio",
        "population": 65358,
        "query": "Springfield, Ohio"
    },
    {
        "city": "Hamilton ",
        "state": "Ohio",
        "population": 60690,
        "query": "Hamilton, Ohio"
    },
    {
        "city": "Kettering ",
        "state": "Ohio",
        "population": 57502,
        "query": "Kettering, Ohio"
    },
    {
        "city": "Lakewood ",
        "state": "Ohio",
        "population": 56646,
        "query": "Lakewood, Ohio"
    },
    {
        "city": "Elyria ",
        "state": "Ohio",
        "population": 55953,
        "query": "Elyria, Ohio"
    },
    {
        "city": "Euclid ",
        "state": "Ohio",
        "population": 52717,
        "query": "Euclid, Ohio"
    },
    {
        "city": "Middletown ",
        "state": "Ohio",
        "population": 51605,
        "query": "Middletown, Ohio"
    },
    {
        "city": "Mentor ",
        "state": "Ohio",
        "population": 50278,
        "query": "Mentor, Ohio"
    },
    {
        "city": "Oklahoma  ",
        "state": "Oklahoma",
        "population": 506132,
        "query": "Oklahoma, Oklahoma"
    },
    {
        "city": "Tulsa ",
        "state": "Oklahoma",
        "population": 393049,
        "query": "Tulsa, Oklahoma"
    },
    {
        "city": "Norman ",
        "state": "Oklahoma",
        "population": 95694,
        "query": "Norman, Oklahoma"
    },
    {
        "city": "Lawton ",
        "state": "Oklahoma",
        "population": 92757,
        "query": "Lawton, Oklahoma"
    },
    {
        "city": "Broken Arrow ",
        "state": "Oklahoma",
        "population": 74859,
        "query": "Broken Arrow, Oklahoma"
    },
    {
        "city": "Edmond ",
        "state": "Oklahoma",
        "population": 68315,
        "query": "Edmond, Oklahoma"
    },
    {
        "city": "Midwest  ",
        "state": "Oklahoma",
        "population": 54088,
        "query": "Midwest, Oklahoma"
    },
    {
        "city": "Portland ",
        "state": "Oregon",
        "population": 529121,
        "query": "Portland, Oregon"
    },
    {
        "city": "Eugene ",
        "state": "Oregon",
        "population": 137893,
        "query": "Eugene, Oregon"
    },
    {
        "city": "Salem ",
        "state": "Oregon",
        "population": 136924,
        "query": "Salem, Oregon"
    },
    {
        "city": "Gresham ",
        "state": "Oregon",
        "population": 90205,
        "query": "Gresham, Oregon"
    },
    {
        "city": "Beaverton ",
        "state": "Oregon",
        "population": 76129,
        "query": "Beaverton, Oregon"
    },
    {
        "city": "Hillsboro ",
        "state": "Oregon",
        "population": 70186,
        "query": "Hillsboro, Oregon"
    },
    {
        "city": "Medford ",
        "state": "Oregon",
        "population": 63154,
        "query": "Medford, Oregon"
    },
    {
        "city": "Springfield ",
        "state": "Oregon",
        "population": 52864,
        "query": "Springfield, Oregon"
    },
    {
        "city": "Bend ",
        "state": "Oregon",
        "population": 52029,
        "query": "Bend, Oregon"
    },
    {
        "city": "Philadelphia ",
        "state": "Pennsylvania",
        "population": 1517550,
        "query": "Philadelphia, Pennsylvania"
    },
    {
        "city": "Pittsburgh ",
        "state": "Pennsylvania",
        "population": 334563,
        "query": "Pittsburgh, Pennsylvania"
    },
    {
        "city": "Allentown ",
        "state": "Pennsylvania",
        "population": 106632,
        "query": "Allentown, Pennsylvania"
    },
    {
        "city": "Erie ",
        "state": "Pennsylvania",
        "population": 103717,
        "query": "Erie, Pennsylvania"
    },
    {
        "city": "Reading ",
        "state": "Pennsylvania",
        "population": 81207,
        "query": "Reading, Pennsylvania"
    },
    {
        "city": "Scranton ",
        "state": "Pennsylvania",
        "population": 76415,
        "query": "Scranton, Pennsylvania"
    },
    {
        "city": "Bethlehem ",
        "state": "Pennsylvania",
        "population": 71329,
        "query": "Bethlehem, Pennsylvania"
    },
    {
        "city": "Lancaster ",
        "state": "Pennsylvania",
        "population": 56348,
        "query": "Lancaster, Pennsylvania"
    },
    {
        "city": "Providence ",
        "state": "Rhode Island",
        "population": 173618,
        "query": "Providence, Rhode Island"
    },
    {
        "city": "Warwick ",
        "state": "Rhode Island",
        "population": 85808,
        "query": "Warwick, Rhode Island"
    },
    {
        "city": "Cranston ",
        "state": "Rhode Island",
        "population": 79269,
        "query": "Cranston, Rhode Island"
    },
    {
        "city": "Pawtucket ",
        "state": "Rhode Island",
        "population": 72958,
        "query": "Pawtucket, Rhode Island"
    },
    {
        "city": "Columbia ",
        "state": "South Carolina",
        "population": 116278,
        "query": "Columbia, South Carolina"
    },
    {
        "city": "Charleston ",
        "state": "South Carolina",
        "population": 96650,
        "query": "Charleston, South Carolina"
    },
    {
        "city": "North Charleston ",
        "state": "South Carolina",
        "population": 79641,
        "query": "North Charleston, South Carolina"
    },
    {
        "city": "Greenville ",
        "state": "South Carolina",
        "population": 56002,
        "query": "Greenville, South Carolina"
    },
    {
        "city": "Sioux Falls ",
        "state": "South Dakota",
        "population": 123975,
        "query": "Sioux Falls, South Dakota"
    },
    {
        "city": "Rapid  ",
        "state": "South Dakota",
        "population": 59607,
        "query": "Rapid, South Dakota"
    },
    {
        "city": "Memphis ",
        "state": "Tennessee",
        "population": 650100,
        "query": "Memphis, Tennessee"
    },
    {
        "city": "Nashville-Davidson",
        "state": "Tennessee",
        "population": 545524,
        "query": "Nashville-Davidson, Tennessee"
    },
    {
        "city": "Knoxville ",
        "state": "Tennessee",
        "population": 173890,
        "query": "Knoxville, Tennessee"
    },
    {
        "city": "Chattanooga ",
        "state": "Tennessee",
        "population": 155554,
        "query": "Chattanooga, Tennessee"
    },
    {
        "city": "Clarksville ",
        "state": "Tennessee",
        "population": 103455,
        "query": "Clarksville, Tennessee"
    },
    {
        "city": "Murfreesboro ",
        "state": "Tennessee",
        "population": 68816,
        "query": "Murfreesboro, Tennessee"
    },
    {
        "city": "Jackson ",
        "state": "Tennessee",
        "population": 59643,
        "query": "Jackson, Tennessee"
    },
    {
        "city": "Johnson  ",
        "state": "Tennessee",
        "population": 55469,
        "query": "Johnson, Tennessee"
    },
    {
        "city": "Houston ",
        "state": "Texas",
        "population": 1953631,
        "query": "Houston, Texas"
    },
    {
        "city": "Dallas ",
        "state": "Texas",
        "population": 1188580,
        "query": "Dallas, Texas"
    },
    {
        "city": "San Antonio ",
        "state": "Texas",
        "population": 1144646,
        "query": "San Antonio, Texas"
    },
    {
        "city": "Austin ",
        "state": "Texas",
        "population": 656562,
        "query": "Austin, Texas"
    },
    {
        "city": "El Paso ",
        "state": "Texas",
        "population": 563662,
        "query": "El Paso, Texas"
    },
    {
        "city": "Fort Worth ",
        "state": "Texas",
        "population": 534694,
        "query": "Fort Worth, Texas"
    },
    {
        "city": "Arlington ",
        "state": "Texas",
        "population": 332969,
        "query": "Arlington, Texas"
    },
    {
        "city": "Corpus Christi ",
        "state": "Texas",
        "population": 277454,
        "query": "Corpus Christi, Texas"
    },
    {
        "city": "Plano ",
        "state": "Texas",
        "population": 222030,
        "query": "Plano, Texas"
    },
    {
        "city": "Garland ",
        "state": "Texas",
        "population": 215768,
        "query": "Garland, Texas"
    },
    {
        "city": "Lubbock ",
        "state": "Texas",
        "population": 199564,
        "query": "Lubbock, Texas"
    },
    {
        "city": "Irving ",
        "state": "Texas",
        "population": 191615,
        "query": "Irving, Texas"
    },
    {
        "city": "Laredo ",
        "state": "Texas",
        "population": 176576,
        "query": "Laredo, Texas"
    },
    {
        "city": "Amarillo ",
        "state": "Texas",
        "population": 173627,
        "query": "Amarillo, Texas"
    },
    {
        "city": "Pasadena ",
        "state": "Texas",
        "population": 141674,
        "query": "Pasadena, Texas"
    },
    {
        "city": "Brownsville ",
        "state": "Texas",
        "population": 139722,
        "query": "Brownsville, Texas"
    },
    {
        "city": "Grand Prairie ",
        "state": "Texas",
        "population": 127427,
        "query": "Grand Prairie, Texas"
    },
    {
        "city": "Mesquite ",
        "state": "Texas",
        "population": 124523,
        "query": "Mesquite, Texas"
    },
    {
        "city": "Abilene ",
        "state": "Texas",
        "population": 115930,
        "query": "Abilene, Texas"
    },
    {
        "city": "Beaumont ",
        "state": "Texas",
        "population": 113866,
        "query": "Beaumont, Texas"
    },
    {
        "city": "Waco ",
        "state": "Texas",
        "population": 113726,
        "query": "Waco, Texas"
    },
    {
        "city": "Carrollton ",
        "state": "Texas",
        "population": 109576,
        "query": "Carrollton, Texas"
    },
    {
        "city": "McAllen ",
        "state": "Texas",
        "population": 106414,
        "query": "McAllen, Texas"
    },
    {
        "city": "Wichita Falls ",
        "state": "Texas",
        "population": 104197,
        "query": "Wichita Falls, Texas"
    },
    {
        "city": "Midland ",
        "state": "Texas",
        "population": 94996,
        "query": "Midland, Texas"
    },
    {
        "city": "Richardson ",
        "state": "Texas",
        "population": 91802,
        "query": "Richardson, Texas"
    },
    {
        "city": "Odessa ",
        "state": "Texas",
        "population": 90943,
        "query": "Odessa, Texas"
    },
    {
        "city": "San Angelo ",
        "state": "Texas",
        "population": 88439,
        "query": "San Angelo, Texas"
    },
    {
        "city": "Killeen ",
        "state": "Texas",
        "population": 86911,
        "query": "Killeen, Texas"
    },
    {
        "city": "Tyler ",
        "state": "Texas",
        "population": 83650,
        "query": "Tyler, Texas"
    },
    {
        "city": "Denton ",
        "state": "Texas",
        "population": 80537,
        "query": "Denton, Texas"
    },
    {
        "city": "Lewisville ",
        "state": "Texas",
        "population": 77737,
        "query": "Lewisville, Texas"
    },
    {
        "city": "Longview ",
        "state": "Texas",
        "population": 73344,
        "query": "Longview, Texas"
    },
    {
        "city": "College Station ",
        "state": "Texas",
        "population": 67890,
        "query": "College Station, Texas"
    },
    {
        "city": "Baytown ",
        "state": "Texas",
        "population": 66430,
        "query": "Baytown, Texas"
    },
    {
        "city": "Bryan ",
        "state": "Texas",
        "population": 65660,
        "query": "Bryan, Texas"
    },
    {
        "city": "Sugar Land ",
        "state": "Texas",
        "population": 63328,
        "query": "Sugar Land, Texas"
    },
    {
        "city": "Round Rock ",
        "state": "Texas",
        "population": 61136,
        "query": "Round Rock, Texas"
    },
    {
        "city": "Victoria ",
        "state": "Texas",
        "population": 60603,
        "query": "Victoria, Texas"
    },
    {
        "city": "Port Arthur ",
        "state": "Texas",
        "population": 57755,
        "query": "Port Arthur, Texas"
    },
    {
        "city": "Harlingen ",
        "state": "Texas",
        "population": 57564,
        "query": "Harlingen, Texas"
    },
    {
        "city": "Galveston ",
        "state": "Texas",
        "population": 57247,
        "query": "Galveston, Texas"
    },
    {
        "city": "North Richland Hills ",
        "state": "Texas",
        "population": 55635,
        "query": "North Richland Hills, Texas"
    },
    {
        "city": "Temple ",
        "state": "Texas",
        "population": 54514,
        "query": "Temple, Texas"
    },
    {
        "city": "McKinney ",
        "state": "Texas",
        "population": 54369,
        "query": "McKinney, Texas"
    },
    {
        "city": "Missouri  ",
        "state": "Texas",
        "population": 52913,
        "query": "Missouri, Texas"
    },
    {
        "city": "Flower Mound ",
        "state": "Texas",
        "population": 50702,
        "query": "Flower Mound, Texas"
    },
    {
        "city": "Salt Lake  ",
        "state": "Utah",
        "population": 181743,
        "query": "Salt Lake, Utah"
    },
    {
        "city": "West Valley",
        "state": "Utah",
        "population": 108896,
        "query": "West Valley, Utah"
    },
    {
        "city": "Provo ",
        "state": "Utah",
        "population": 105166,
        "query": "Provo, Utah"
    },
    {
        "city": "Sandy ",
        "state": "Utah",
        "population": 88418,
        "query": "Sandy, Utah"
    },
    {
        "city": "Orem ",
        "state": "Utah",
        "population": 84324,
        "query": "Orem, Utah"
    },
    {
        "city": "Ogden ",
        "state": "Utah",
        "population": 77226,
        "query": "Ogden, Utah"
    },
    {
        "city": "West Jordan ",
        "state": "Utah",
        "population": 68336,
        "query": "West Jordan, Utah"
    },
    {
        "city": "Layton ",
        "state": "Utah",
        "population": 58474,
        "query": "Layton, Utah"
    },
    {
        "city": "Taylorsville ",
        "state": "Utah",
        "population": 57439,
        "query": "Taylorsville, Utah"
    },
    {
        "city": "Virginia Beach ",
        "state": "Virginia",
        "population": 425257,
        "query": "Virginia Beach, Virginia"
    },
    {
        "city": "Norfolk ",
        "state": "Virginia",
        "population": 234403,
        "query": "Norfolk, Virginia"
    },
    {
        "city": "Chesapeake ",
        "state": "Virginia",
        "population": 199184,
        "query": "Chesapeake, Virginia"
    },
    {
        "city": "Richmond ",
        "state": "Virginia",
        "population": 197790,
        "query": "Richmond, Virginia"
    },
    {
        "city": "Newport News ",
        "state": "Virginia",
        "population": 180150,
        "query": "Newport News, Virginia"
    },
    {
        "city": "Hampton ",
        "state": "Virginia",
        "population": 146437,
        "query": "Hampton, Virginia"
    },
    {
        "city": "Alexandria ",
        "state": "Virginia",
        "population": 128283,
        "query": "Alexandria, Virginia"
    },
    {
        "city": "Portsmouth ",
        "state": "Virginia",
        "population": 100565,
        "query": "Portsmouth, Virginia"
    },
    {
        "city": "Roanoke ",
        "state": "Virginia",
        "population": 94911,
        "query": "Roanoke, Virginia"
    },
    {
        "city": "Lynchburg ",
        "state": "Virginia",
        "population": 65269,
        "query": "Lynchburg, Virginia"
    },
    {
        "city": "Suffolk ",
        "state": "Virginia",
        "population": 63677,
        "query": "Suffolk, Virginia"
    },
    {
        "city": "Seattle ",
        "state": "Washington",
        "population": 563374,
        "query": "Seattle, Washington"
    },
    {
        "city": "Spokane ",
        "state": "Washington",
        "population": 195629,
        "query": "Spokane, Washington"
    },
    {
        "city": "Tacoma ",
        "state": "Washington",
        "population": 193556,
        "query": "Tacoma, Washington"
    },
    {
        "city": "Vancouver ",
        "state": "Washington",
        "population": 143560,
        "query": "Vancouver, Washington"
    },
    {
        "city": "Bellevue ",
        "state": "Washington",
        "population": 109569,
        "query": "Bellevue, Washington"
    },
    {
        "city": "Everett ",
        "state": "Washington",
        "population": 91488,
        "query": "Everett, Washington"
    },
    {
        "city": "Federal Way ",
        "state": "Washington",
        "population": 83259,
        "query": "Federal Way, Washington"
    },
    {
        "city": "Kent ",
        "state": "Washington",
        "population": 79524,
        "query": "Kent, Washington"
    },
    {
        "city": "Yakima ",
        "state": "Washington",
        "population": 71845,
        "query": "Yakima, Washington"
    },
    {
        "city": "Bellingham ",
        "state": "Washington",
        "population": 67171,
        "query": "Bellingham, Washington"
    },
    {
        "city": "Lakewood ",
        "state": "Washington",
        "population": 58211,
        "query": "Lakewood, Washington"
    },
    {
        "city": "Kennewick ",
        "state": "Washington",
        "population": 54693,
        "query": "Kennewick, Washington"
    },
    {
        "city": "Shoreline ",
        "state": "Washington",
        "population": 53025,
        "query": "Shoreline, Washington"
    },
    {
        "city": "Renton ",
        "state": "Washington",
        "population": 50052,
        "query": "Renton, Washington"
    },
    {
        "city": "Charleston ",
        "state": "West Virginia",
        "population": 53421,
        "query": "Charleston, West Virginia"
    },
    {
        "city": "Huntington ",
        "state": "West Virginia",
        "population": 51475,
        "query": "Huntington, West Virginia"
    },
    {
        "city": "Milwaukee ",
        "state": "Wisconsin",
        "population": 596974,
        "query": "Milwaukee, Wisconsin"
    },
    {
        "city": "Madison ",
        "state": "Wisconsin",
        "population": 208054,
        "query": "Madison, Wisconsin"
    },
    {
        "city": "Green Bay ",
        "state": "Wisconsin",
        "population": 102313,
        "query": "Green Bay, Wisconsin"
    },
    {
        "city": "Kenosha ",
        "state": "Wisconsin",
        "population": 90352,
        "query": "Kenosha, Wisconsin"
    },
    {
        "city": "Racine ",
        "state": "Wisconsin",
        "population": 81855,
        "query": "Racine, Wisconsin"
    },
    {
        "city": "Appleton ",
        "state": "Wisconsin",
        "population": 70087,
        "query": "Appleton, Wisconsin"
    },
    {
        "city": "Waukesha ",
        "state": "Wisconsin",
        "population": 64825,
        "query": "Waukesha, Wisconsin"
    },
    {
        "city": "Oshkosh ",
        "state": "Wisconsin",
        "population": 62916,
        "query": "Oshkosh, Wisconsin"
    },
    {
        "city": "Eau Claire ",
        "state": "Wisconsin",
        "population": 61704,
        "query": "Eau Claire, Wisconsin"
    },
    {
        "city": "West Allis ",
        "state": "Wisconsin",
        "population": 61254,
        "query": "West Allis, Wisconsin"
    },
    {
        "city": "Janesville ",
        "state": "Wisconsin",
        "population": 59498,
        "query": "Janesville, Wisconsin"
    },
    {
        "city": "La Crosse ",
        "state": "Wisconsin",
        "population": 51818,
        "query": "La Crosse, Wisconsin"
    },
    {
        "city": "Sheboygan ",
        "state": "Wisconsin",
        "population": 50792,
        "query": "Sheboygan, Wisconsin"
    },
    {
        "city": "Cheyenne ",
        "state": "Wyoming",
        "population": 53011,
        "query": "Cheyenne, Wyoming"
    }
]

LocationModel.insertMany(locations);