const fs = require('fs');
const path = require('path');
const topojson = require('topojson-client');
const d3Geo = require('d3-geo');

const us = require('us-atlas/states-10m.json');

// Projection setup matching standard viewBox 0 0 975 610
const projection = d3Geo.geoAlbersUsa().scale(1300).translate([487.5, 305]);
const pathGen = d3Geo.geoPath().projection(projection);

const statesGeo = topojson.feature(us, us.objects.states).features;

// Comprehensive metadata for all 50 states + DC
const stateMeta = {
  'Alabama': {
    abbr: 'AL',
    capital: 'Montgomery',
    capitalLatLon: [-86.3077, 32.3792],
    timeZone: 'Central',
    iana: 'America/Chicago',
    observesDst: true,
    splitNote: 'Phenix City and parts of Russell/Lee county unofficially observe Eastern Time due to ties to Columbus, GA.',
    nickname: 'The Yellowhammer State',
    population: 5108468,
    areaSqMi: 52420,
    establishedYear: 1819
  },
  'Alaska': {
    abbr: 'AK',
    capital: 'Juneau',
    capitalLatLon: [-134.4197, 58.3019],
    timeZone: 'Alaska',
    iana: 'America/Anchorage',
    observesDst: true,
    splitNote: 'The westernmost Aleutian Islands observe Hawaii-Aleutian Time (HAT, UTC-10 / UTC-9).',
    nickname: 'The Last Frontier',
    population: 733406,
    areaSqMi: 665384,
    establishedYear: 1959
  },
  'Arizona': {
    abbr: 'AZ',
    capital: 'Phoenix',
    capitalLatLon: [-112.0740, 33.4484],
    timeZone: 'Mountain',
    iana: 'America/Phoenix',
    observesDst: false,
    splitNote: 'Arizona does NOT observe Daylight Saving Time (remains UTC-7 year-round), except the Navajo Nation which DOES observe DST.',
    nickname: 'The Grand Canyon State',
    population: 7431344,
    areaSqMi: 113990,
    establishedYear: 1912
  },
  'Arkansas': {
    abbr: 'AR',
    capital: 'Little Rock',
    capitalLatLon: [-92.2896, 34.7465],
    timeZone: 'Central',
    iana: 'America/Chicago',
    observesDst: true,
    splitNote: 'Entire state observes Central Time.',
    nickname: 'The Natural State',
    population: 3067732,
    areaSqMi: 53179,
    establishedYear: 1836
  },
  'California': {
    abbr: 'CA',
    capital: 'Sacramento',
    capitalLatLon: [-121.4944, 38.5816],
    timeZone: 'Pacific',
    iana: 'America/Los_Angeles',
    observesDst: true,
    splitNote: 'Entire state observes Pacific Time.',
    nickname: 'The Golden State',
    population: 38965193,
    areaSqMi: 163695,
    establishedYear: 1850
  },
  'Colorado': {
    abbr: 'CO',
    capital: 'Denver',
    capitalLatLon: [-104.9903, 39.7392],
    timeZone: 'Mountain',
    iana: 'America/Denver',
    observesDst: true,
    splitNote: 'Entire state observes Mountain Time.',
    nickname: 'The Centennial State',
    population: 5877610,
    areaSqMi: 104094,
    establishedYear: 1876
  },
  'Connecticut': {
    abbr: 'CT',
    capital: 'Hartford',
    capitalLatLon: [-72.6734, 41.7658],
    timeZone: 'Eastern',
    iana: 'America/New_York',
    observesDst: true,
    splitNote: 'Entire state observes Eastern Time.',
    nickname: 'The Constitution State',
    population: 3617176,
    areaSqMi: 5543,
    establishedYear: 1788,
    callout: { x: 920, y: 220 }
  },
  'Delaware': {
    abbr: 'DE',
    capital: 'Dover',
    capitalLatLon: [-75.5244, 39.1582],
    timeZone: 'Eastern',
    iana: 'America/New_York',
    observesDst: true,
    splitNote: 'Entire state observes Eastern Time.',
    nickname: 'The First State',
    population: 1031890,
    areaSqMi: 2489,
    establishedYear: 1787,
    callout: { x: 915, y: 310 }
  },
  'District of Columbia': {
    abbr: 'DC',
    capital: 'Washington, D.C.',
    capitalLatLon: [-77.0369, 38.9072],
    timeZone: 'Eastern',
    iana: 'America/New_York',
    observesDst: true,
    splitNote: 'Federal capital district, entirely in Eastern Time.',
    nickname: 'The Nation\'s Capital',
    population: 678972,
    areaSqMi: 68,
    establishedYear: 1790,
    callout: { x: 900, y: 345 }
  },
  'Florida': {
    abbr: 'FL',
    capital: 'Tallahassee',
    capitalLatLon: [-84.2807, 30.4383],
    timeZone: 'Eastern',
    iana: 'America/New_York',
    observesDst: true,
    splitNote: 'Most of Florida is Eastern Time, but 9 counties west of the Apalachicola River in the Panhandle are Central Time.',
    nickname: 'The Sunshine State',
    population: 22610726,
    areaSqMi: 65758,
    establishedYear: 1845
  },
  'Georgia': {
    abbr: 'GA',
    capital: 'Atlanta',
    capitalLatLon: [-84.3880, 33.7490],
    timeZone: 'Eastern',
    iana: 'America/New_York',
    observesDst: true,
    splitNote: 'Entire state observes Eastern Time.',
    nickname: 'The Peach State',
    population: 11029227,
    areaSqMi: 59425,
    establishedYear: 1788
  },
  'Hawaii': {
    abbr: 'HI',
    capital: 'Honolulu',
    capitalLatLon: [-157.8583, 21.3069],
    timeZone: 'Hawaii-Aleutian',
    iana: 'Pacific/Honolulu',
    observesDst: false,
    splitNote: 'Hawaii does NOT observe Daylight Saving Time (remains UTC-10 year-round).',
    nickname: 'The Aloha State',
    population: 1435138,
    areaSqMi: 10932,
    establishedYear: 1959
  },
  'Idaho': {
    abbr: 'ID',
    capital: 'Boise',
    capitalLatLon: [-116.2023, 43.6150],
    timeZone: 'Mountain',
    iana: 'America/Boise',
    observesDst: true,
    splitNote: 'Southern Idaho observes Mountain Time, while the Idaho Panhandle (north of the Salmon River) observes Pacific Time.',
    nickname: 'The Gem State',
    population: 1964726,
    areaSqMi: 83569,
    establishedYear: 1890
  },
  'Illinois': {
    abbr: 'IL',
    capital: 'Springfield',
    capitalLatLon: [-89.6504, 39.7817],
    timeZone: 'Central',
    iana: 'America/Chicago',
    observesDst: true,
    splitNote: 'Entire state observes Central Time.',
    nickname: 'The Prairie State',
    population: 12549689,
    areaSqMi: 57914,
    establishedYear: 1818
  },
  'Indiana': {
    abbr: 'IN',
    capital: 'Indianapolis',
    capitalLatLon: [-86.1581, 39.7684],
    timeZone: 'Eastern',
    iana: 'America/Indiana/Indianapolis',
    observesDst: true,
    splitNote: 'Most of Indiana (80 counties) is in Eastern Time, while 12 counties (6 in NW near Chicago and 6 in SW) observe Central Time.',
    nickname: 'The Hoosier State',
    population: 6862199,
    areaSqMi: 36420,
    establishedYear: 1816
  },
  'Iowa': {
    abbr: 'IA',
    capital: 'Des Moines',
    capitalLatLon: [-93.6091, 41.5868],
    timeZone: 'Central',
    iana: 'America/Chicago',
    observesDst: true,
    splitNote: 'Entire state observes Central Time.',
    nickname: 'The Hawkeye State',
    population: 3207004,
    areaSqMi: 56273,
    establishedYear: 1846
  },
  'Kansas': {
    abbr: 'KS',
    capital: 'Topeka',
    capitalLatLon: [-95.6752, 39.0473],
    timeZone: 'Central',
    iana: 'America/Chicago',
    observesDst: true,
    splitNote: 'Nearly all of Kansas is in Central Time, but 4 far western counties (Sherman, Wallace, Greeley, Hamilton) observe Mountain Time.',
    nickname: 'The Sunflower State',
    population: 2940546,
    areaSqMi: 82278,
    establishedYear: 1861
  },
  'Kentucky': {
    abbr: 'KY',
    capital: 'Frankfort',
    capitalLatLon: [-84.8733, 38.2009],
    timeZone: 'Eastern',
    iana: 'America/New_York',
    observesDst: true,
    splitNote: 'Roughly the eastern 60% of Kentucky is Eastern Time, while the western 40% observes Central Time.',
    nickname: 'The Bluegrass State',
    population: 4526154,
    areaSqMi: 40408,
    establishedYear: 1792
  },
  'Louisiana': {
    abbr: 'LA',
    capital: 'Baton Rouge',
    capitalLatLon: [-91.1871, 30.4515],
    timeZone: 'Central',
    iana: 'America/Chicago',
    observesDst: true,
    splitNote: 'Entire state observes Central Time.',
    nickname: 'The Pelican State',
    population: 4573749,
    areaSqMi: 52378,
    establishedYear: 1812
  },
  'Maine': {
    abbr: 'ME',
    capital: 'Augusta',
    capitalLatLon: [-69.7795, 44.3106],
    timeZone: 'Eastern',
    iana: 'America/New_York',
    observesDst: true,
    splitNote: 'Easternmost state in contiguous US, observing Eastern Time.',
    nickname: 'The Pine Tree State',
    population: 1395722,
    areaSqMi: 35385,
    establishedYear: 1820
  },
  'Maryland': {
    abbr: 'MD',
    capital: 'Annapolis',
    capitalLatLon: [-76.4922, 38.9784],
    timeZone: 'Eastern',
    iana: 'America/New_York',
    observesDst: true,
    splitNote: 'Entire state observes Eastern Time.',
    nickname: 'The Old Line State',
    population: 6180253,
    areaSqMi: 12406,
    establishedYear: 1788,
    callout: { x: 910, y: 280 }
  },
  'Massachusetts': {
    abbr: 'MA',
    capital: 'Boston',
    capitalLatLon: [-71.0589, 42.3601],
    timeZone: 'Eastern',
    iana: 'America/New_York',
    observesDst: true,
    splitNote: 'Entire state observes Eastern Time.',
    nickname: 'The Bay State',
    population: 7001399,
    areaSqMi: 10554,
    establishedYear: 1788,
    callout: { x: 925, y: 185 }
  },
  'Michigan': {
    abbr: 'MI',
    capital: 'Lansing',
    capitalLatLon: [-84.5555, 42.7325],
    timeZone: 'Eastern',
    iana: 'America/Detroit',
    observesDst: true,
    splitNote: 'Almost all of Michigan is Eastern Time, except 4 counties in the Upper Peninsula bordering Wisconsin (Gogebic, Iron, Dickinson, Menominee) which observe Central Time.',
    nickname: 'The Great Lakes State',
    population: 10037261,
    areaSqMi: 96714,
    establishedYear: 1837
  },
  'Minnesota': {
    abbr: 'MN',
    capital: 'Saint Paul',
    capitalLatLon: [-93.0900, 44.9537],
    timeZone: 'Central',
    iana: 'America/Chicago',
    observesDst: true,
    splitNote: 'Entire state observes Central Time.',
    nickname: 'The North Star State',
    population: 5737915,
    areaSqMi: 86936,
    establishedYear: 1858
  },
  'Mississippi': {
    abbr: 'MS',
    capital: 'Jackson',
    capitalLatLon: [-90.1848, 32.2988],
    timeZone: 'Central',
    iana: 'America/Chicago',
    observesDst: true,
    splitNote: 'Entire state observes Central Time.',
    nickname: 'The Magnolia State',
    population: 2939690,
    areaSqMi: 48432,
    establishedYear: 1817
  },
  'Missouri': {
    abbr: 'MO',
    capital: 'Jefferson City',
    capitalLatLon: [-92.1735, 38.5767],
    timeZone: 'Central',
    iana: 'America/Chicago',
    observesDst: true,
    splitNote: 'Entire state observes Central Time.',
    nickname: 'The Show-Me State',
    population: 6196156,
    areaSqMi: 69707,
    establishedYear: 1821
  },
  'Montana': {
    abbr: 'MT',
    capital: 'Helena',
    capitalLatLon: [-112.0391, 46.5891],
    timeZone: 'Mountain',
    iana: 'America/Denver',
    observesDst: true,
    splitNote: 'Entire state observes Mountain Time.',
    nickname: 'The Treasure State',
    population: 1132812,
    areaSqMi: 147040,
    establishedYear: 1889
  },
  'Nebraska': {
    abbr: 'NE',
    capital: 'Lincoln',
    capitalLatLon: [-96.7026, 40.8136],
    timeZone: 'Central',
    iana: 'America/Chicago',
    observesDst: true,
    splitNote: 'Eastern two-thirds of Nebraska is in Central Time, while the western panhandle is in Mountain Time.',
    nickname: 'The Cornhusker State',
    population: 1978379,
    areaSqMi: 77348,
    establishedYear: 1867
  },
  'Nevada': {
    abbr: 'NV',
    capital: 'Carson City',
    capitalLatLon: [-119.7674, 39.1638],
    timeZone: 'Pacific',
    iana: 'America/Los_Angeles',
    observesDst: true,
    splitNote: 'Nearly all Nevada is Pacific Time, but West Wendover and Jackpot unofficially observe Mountain Time.',
    nickname: 'The Silver State',
    population: 3194176,
    areaSqMi: 110572,
    establishedYear: 1864
  },
  'New Hampshire': {
    abbr: 'NH',
    capital: 'Concord',
    capitalLatLon: [-71.5376, 43.2081],
    timeZone: 'Eastern',
    iana: 'America/New_York',
    observesDst: true,
    splitNote: 'Entire state observes Eastern Time.',
    nickname: 'The Granite State',
    population: 1402054,
    areaSqMi: 9349,
    establishedYear: 1788,
    callout: { x: 915, y: 135 }
  },
  'New Jersey': {
    abbr: 'NJ',
    capital: 'Trenton',
    capitalLatLon: [-74.7597, 40.2206],
    timeZone: 'Eastern',
    iana: 'America/New_York',
    observesDst: true,
    splitNote: 'Entire state observes Eastern Time.',
    nickname: 'The Garden State',
    population: 9290841,
    areaSqMi: 8723,
    establishedYear: 1787,
    callout: { x: 910, y: 250 }
  },
  'New Mexico': {
    abbr: 'NM',
    capital: 'Santa Fe',
    capitalLatLon: [-105.9378, 35.6870],
    timeZone: 'Mountain',
    iana: 'America/Denver',
    observesDst: true,
    splitNote: 'Entire state observes Mountain Time.',
    nickname: 'Land of Enchantment',
    population: 2114371,
    areaSqMi: 121590,
    establishedYear: 1912
  },
  'New York': {
    abbr: 'NY',
    capital: 'Albany',
    capitalLatLon: [-73.7562, 42.6526],
    timeZone: 'Eastern',
    iana: 'America/New_York',
    observesDst: true,
    splitNote: 'Entire state observes Eastern Time.',
    nickname: 'The Empire State',
    population: 19571216,
    areaSqMi: 54555,
    establishedYear: 1788
  },
  'North Carolina': {
    abbr: 'NC',
    capital: 'Raleigh',
    capitalLatLon: [-78.6382, 35.7796],
    timeZone: 'Eastern',
    iana: 'America/New_York',
    observesDst: true,
    splitNote: 'Entire state observes Eastern Time.',
    nickname: 'The Tar Heel State',
    population: 10835491,
    areaSqMi: 53819,
    establishedYear: 1789
  },
  'North Dakota': {
    abbr: 'ND',
    capital: 'Bismarck',
    capitalLatLon: [-100.7837, 46.8083],
    timeZone: 'Central',
    iana: 'America/Chicago',
    observesDst: true,
    splitNote: 'Most of North Dakota is in Central Time, while counties in the southwest (west of the Missouri River) observe Mountain Time.',
    nickname: 'The Peace Garden State',
    population: 783926,
    areaSqMi: 70698,
    establishedYear: 1889
  },
  'Ohio': {
    abbr: 'OH',
    capital: 'Columbus',
    capitalLatLon: [-82.9988, 39.9612],
    timeZone: 'Eastern',
    iana: 'America/New_York',
    observesDst: true,
    splitNote: 'Entire state observes Eastern Time.',
    nickname: 'The Buckeye State',
    population: 11785935,
    areaSqMi: 44826,
    establishedYear: 1803
  },
  'Oklahoma': {
    abbr: 'OK',
    capital: 'Oklahoma City',
    capitalLatLon: [-97.5164, 35.4676],
    timeZone: 'Central',
    iana: 'America/Chicago',
    observesDst: true,
    splitNote: 'Entire state observes Central Time, with Kenton in the far western panhandle informally using Mountain Time.',
    nickname: 'The Sooner State',
    population: 4053824,
    areaSqMi: 69899,
    establishedYear: 1907
  },
  'Oregon': {
    abbr: 'OR',
    capital: 'Salem',
    capitalLatLon: [-123.0351, 44.9429],
    timeZone: 'Pacific',
    iana: 'America/Los_Angeles',
    observesDst: true,
    splitNote: 'Most of Oregon observes Pacific Time; the northern portion of Malheur County observes Mountain Time.',
    nickname: 'The Beaver State',
    population: 4233358,
    areaSqMi: 98379,
    establishedYear: 1859
  },
  'Pennsylvania': {
    abbr: 'PA',
    capital: 'Harrisburg',
    capitalLatLon: [-76.8867, 40.2732],
    timeZone: 'Eastern',
    iana: 'America/New_York',
    observesDst: true,
    splitNote: 'Entire state observes Eastern Time.',
    nickname: 'The Keystone State',
    population: 12961683,
    areaSqMi: 46054,
    establishedYear: 1787
  },
  'Rhode Island': {
    abbr: 'RI',
    capital: 'Providence',
    capitalLatLon: [-71.4128, 41.8240],
    timeZone: 'Eastern',
    iana: 'America/New_York',
    observesDst: true,
    splitNote: 'Smallest US state by area, entirely in Eastern Time.',
    nickname: 'The Ocean State',
    population: 1095962,
    areaSqMi: 1545,
    establishedYear: 1790,
    callout: { x: 935, y: 200 }
  },
  'South Carolina': {
    abbr: 'SC',
    capital: 'Columbia',
    capitalLatLon: [-81.0348, 34.0007],
    timeZone: 'Eastern',
    iana: 'America/New_York',
    observesDst: true,
    splitNote: 'Entire state observes Eastern Time.',
    nickname: 'The Palmetto State',
    population: 5373555,
    areaSqMi: 32020,
    establishedYear: 1788
  },
  'South Dakota': {
    abbr: 'SD',
    capital: 'Pierre',
    capitalLatLon: [-100.3510, 44.3683],
    timeZone: 'Central',
    iana: 'America/Chicago',
    observesDst: true,
    splitNote: 'Divided roughly in half by the Missouri River: Eastern half is Central Time, western half is Mountain Time.',
    nickname: 'The Mount Rushmore State',
    population: 919318,
    areaSqMi: 77116,
    establishedYear: 1889
  },
  'Tennessee': {
    abbr: 'TN',
    capital: 'Nashville',
    capitalLatLon: [-86.7816, 36.1627],
    timeZone: 'Central',
    iana: 'America/Chicago',
    observesDst: true,
    splitNote: 'Divided between Central Time (western and middle Tennessee, including Nashville & Memphis) and Eastern Time (East Tennessee, including Knoxville & Chattanooga).',
    nickname: 'The Volunteer State',
    population: 7126489,
    areaSqMi: 42144,
    establishedYear: 1796
  },
  'Texas': {
    abbr: 'TX',
    capital: 'Austin',
    capitalLatLon: [-97.7431, 30.2672],
    timeZone: 'Central',
    iana: 'America/Chicago',
    observesDst: true,
    splitNote: 'Almost all of Texas is Central Time, except El Paso and Hudspeth counties in far west Texas which observe Mountain Time.',
    nickname: 'The Lone Star State',
    population: 30503301,
    areaSqMi: 268596,
    establishedYear: 1845
  },
  'Utah': {
    abbr: 'UT',
    capital: 'Salt Lake City',
    capitalLatLon: [-111.8910, 40.7608],
    timeZone: 'Mountain',
    iana: 'America/Denver',
    observesDst: true,
    splitNote: 'Entire state observes Mountain Time.',
    nickname: 'The Beehive State',
    population: 3417734,
    areaSqMi: 84897,
    establishedYear: 1896
  },
  'Vermont': {
    abbr: 'VT',
    capital: 'Montpelier',
    capitalLatLon: [-72.5778, 44.2601],
    timeZone: 'Eastern',
    iana: 'America/New_York',
    observesDst: true,
    splitNote: 'Entire state observes Eastern Time.',
    nickname: 'The Green Mountain State',
    population: 647464,
    areaSqMi: 9616,
    establishedYear: 1791,
    callout: { x: 840, y: 110 }
  },
  'Virginia': {
    abbr: 'VA',
    capital: 'Richmond',
    capitalLatLon: [-77.4360, 37.5407],
    timeZone: 'Eastern',
    iana: 'America/New_York',
    observesDst: true,
    splitNote: 'Entire state observes Eastern Time.',
    nickname: 'Old Dominion',
    population: 8715698,
    areaSqMi: 42775,
    establishedYear: 1788
  },
  'Washington': {
    abbr: 'WA',
    capital: 'Olympia',
    capitalLatLon: [-122.9007, 47.0379],
    timeZone: 'Pacific',
    iana: 'America/Los_Angeles',
    observesDst: true,
    splitNote: 'Entire state observes Pacific Time.',
    nickname: 'The Evergreen State',
    population: 7812880,
    areaSqMi: 71298,
    establishedYear: 1889
  },
  'West Virginia': {
    abbr: 'WV',
    capital: 'Charleston',
    capitalLatLon: [-81.6326, 38.3498],
    timeZone: 'Eastern',
    iana: 'America/New_York',
    observesDst: true,
    splitNote: 'Entire state observes Eastern Time.',
    nickname: 'The Mountain State',
    population: 1770071,
    areaSqMi: 24230,
    establishedYear: 1863
  },
  'Wisconsin': {
    abbr: 'WI',
    capital: 'Madison',
    capitalLatLon: [-89.4012, 43.0731],
    timeZone: 'Central',
    iana: 'America/Chicago',
    observesDst: true,
    splitNote: 'Entire state observes Central Time.',
    nickname: 'The Badger State',
    population: 5910955,
    areaSqMi: 65496,
    establishedYear: 1848
  },
  'Wyoming': {
    abbr: 'WY',
    capital: 'Cheyenne',
    capitalLatLon: [-104.8202, 41.1400],
    timeZone: 'Mountain',
    iana: 'America/Denver',
    observesDst: true,
    splitNote: 'Entire state observes Mountain Time.',
    nickname: 'The Equality State',
    population: 584057,
    areaSqMi: 97813,
    establishedYear: 1890
  }
};

// Custom manual centroid tuning for optimal label placement
const centroidAdjustments = {
  'FL': [735, 500],
  'LA': [560, 475],
  'MI': [675, 230],
  'CA': [70, 290],
  'AK': [160, 500],
  'HI': [300, 560],
  'ID': [170, 180],
  'TX': [440, 440],
  'MD': [790, 275],
  'NJ': [845, 230],
  'MA': [875, 175],
  'NY': [805, 175],
  'NC': [785, 345],
  'VA': [780, 295],
  'KY': [675, 320],
  'TN': [660, 360],
  'WV': [745, 280]
};

const outputList = [];

for (const feature of statesGeo) {
  const name = feature.properties.name;
  if (!stateMeta[name]) continue; // Skip non-states/territories like Guam, Samoa, PR
  const meta = stateMeta[name];
  const pathD = pathGen(feature);
  if (!pathD) continue;

  const rawCentroid = pathGen.centroid(feature);
  const capitalPoint = projection(meta.capitalLatLon) || rawCentroid;

  let labelPos = centroidAdjustments[meta.abbr] || [
    Math.round(rawCentroid[0] * 10) / 10,
    Math.round(rawCentroid[1] * 10) / 10
  ];

  outputList.push({
    id: meta.abbr,
    fips: feature.id,
    name: name,
    abbr: meta.abbr,
    capital: meta.capital,
    timeZone: meta.timeZone,
    iana: meta.iana,
    observesDst: meta.observesDst,
    splitNote: meta.splitNote,
    nickname: meta.nickname,
    population: meta.population,
    areaSqMi: meta.areaSqMi,
    establishedYear: meta.establishedYear,
    path: pathD,
    centroid: [Math.round(rawCentroid[0] * 10) / 10, Math.round(rawCentroid[1] * 10) / 10],
    labelPos: labelPos,
    capitalPos: [Math.round(capitalPoint[0] * 10) / 10, Math.round(capitalPoint[1] * 10) / 10],
    callout: meta.callout || null
  });
}

// Sort alphabetically by state name
outputList.sort((a, b) => a.name.localeCompare(b.name));

const tsCode = `/**
 * US States Geo & Time Zones Data
 * Pre-compiled Albers USA Projection coordinates (viewBox 0 0 975 610)
 */

export type TimeZoneCategory = 'Eastern' | 'Central' | 'Mountain' | 'Pacific' | 'Alaska' | 'Hawaii-Aleutian';

export interface StateData {
  id: string;
  fips: string;
  name: string;
  abbr: string;
  capital: string;
  timeZone: TimeZoneCategory;
  iana: string;
  observesDst: boolean;
  splitNote: string;
  nickname: string;
  population: number;
  areaSqMi: number;
  establishedYear: number;
  path: string;
  centroid: [number, number];
  labelPos: [number, number];
  capitalPos: [number, number];
  callout: { x: number; y: number } | null;
}

export interface TimeZoneDetails {
  name: TimeZoneCategory;
  shortName: string;
  standardAbbr: string;
  daylightAbbr: string;
  utcStandard: string;
  utcDaylight: string;
  ianaSample: string;
  colorLight: string;
  colorDark: string;
  colorBorder: string;
  accentBg: string;
  textAccent: string;
  statesCount: number;
  description: string;
}

export const TIME_ZONE_DEFINITIONS: Record<TimeZoneCategory, TimeZoneDetails> = {
  'Eastern': {
    name: 'Eastern',
    shortName: 'Eastern Time',
    standardAbbr: 'EST',
    daylightAbbr: 'EDT',
    utcStandard: 'UTC-5',
    utcDaylight: 'UTC-4',
    ianaSample: 'America/New_York',
    colorLight: '#3b82f6', // blue-500
    colorDark: '#2563eb',  // blue-600
    colorBorder: '#1d4ed8',
    accentBg: 'bg-blue-500/15',
    textAccent: 'text-blue-600 dark:text-blue-400',
    statesCount: 17,
    description: 'Covers the Eastern Seaboard and Appalachian states, containing nearly 47% of the US population.'
  },
  'Central': {
    name: 'Central',
    shortName: 'Central Time',
    standardAbbr: 'CST',
    daylightAbbr: 'CDT',
    utcStandard: 'UTC-6',
    utcDaylight: 'UTC-5',
    ianaSample: 'America/Chicago',
    colorLight: '#10b981', // emerald-500
    colorDark: '#059669',  // emerald-600
    colorBorder: '#047857',
    accentBg: 'bg-emerald-500/15',
    textAccent: 'text-emerald-600 dark:text-emerald-400',
    statesCount: 20,
    description: 'Stretches from the Great Lakes down through the Midwest and Gulf Coast to Texas.'
  },
  'Mountain': {
    name: 'Mountain',
    shortName: 'Mountain Time',
    standardAbbr: 'MST',
    daylightAbbr: 'MDT',
    utcStandard: 'UTC-7',
    utcDaylight: 'UTC-6',
    ianaSample: 'America/Denver',
    colorLight: '#f59e0b', // amber-500
    colorDark: '#d97706',  // amber-600
    colorBorder: '#b45309',
    accentBg: 'bg-amber-500/15',
    textAccent: 'text-amber-600 dark:text-amber-400',
    statesCount: 8,
    description: 'Encompasses the Rocky Mountain and Desert Southwest states; Arizona observes MST year-round.'
  },
  'Pacific': {
    name: 'Pacific',
    shortName: 'Pacific Time',
    standardAbbr: 'PST',
    daylightAbbr: 'PDT',
    utcStandard: 'UTC-8',
    utcDaylight: 'UTC-7',
    ianaSample: 'America/Los_Angeles',
    colorLight: '#8b5cf6', // purple-500
    colorDark: '#7c3aed',  // purple-600
    colorBorder: '#6d28d9',
    accentBg: 'bg-purple-500/15',
    textAccent: 'text-purple-600 dark:text-purple-400',
    statesCount: 4,
    description: 'Encompasses West Coast states California, Washington, Oregon, and Nevada.'
  },
  'Alaska': {
    name: 'Alaska',
    shortName: 'Alaska Time',
    standardAbbr: 'AKST',
    daylightAbbr: 'AKDT',
    utcStandard: 'UTC-9',
    utcDaylight: 'UTC-8',
    ianaSample: 'America/Anchorage',
    colorLight: '#06b6d4', // cyan-500
    colorDark: '#0891b2',  // cyan-600
    colorBorder: '#0e7490',
    accentBg: 'bg-cyan-500/15',
    textAccent: 'text-cyan-600 dark:text-cyan-400',
    statesCount: 1,
    description: 'Covers almost the entirety of Alaska, spanning vast subarctic and arctic regions.'
  },
  'Hawaii-Aleutian': {
    name: 'Hawaii-Aleutian',
    shortName: 'Hawaii-Aleutian Time',
    standardAbbr: 'HAST',
    daylightAbbr: 'HADT',
    utcStandard: 'UTC-10',
    utcDaylight: 'UTC-9',
    ianaSample: 'Pacific/Honolulu',
    colorLight: '#ec4899', // pink-500
    colorDark: '#db2777',  // pink-600
    colorBorder: '#be185d',
    accentBg: 'bg-pink-500/15',
    textAccent: 'text-pink-600 dark:text-pink-400',
    statesCount: 1,
    description: 'Covers the Hawaiian archipelago (which never observes DST) and the westernmost Aleutian Islands.'
  }
};

export const US_STATES: StateData[] = ${JSON.stringify(outputList, null, 2)};
`;

fs.mkdirSync(path.join(__dirname, '../src/data'), { recursive: true });
fs.writeFileSync(path.join(__dirname, '../src/data/usStatesData.ts'), tsCode);
console.log('Successfully generated usStatesData.ts with', outputList.length, 'states/districts.');
