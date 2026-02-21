const sampleListings = [
  {
    title: 'Cozy Beachfront Cottage',
    description: 'Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.',
    image: {
      url: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 1500,
    location: 'Malibu',
    country: 'United States', 
    geometry: { type: 'Point', coordinates: [ -118.689423, 34.035591 ] },
    category: 'farm',
    isTrending: false
  },
  {
    title: 'Modern Loft in Downtown',
    description: 'Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!',
    image: {
      url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 1200,
    location: 'New York City',
    country: 'United States',
    geometry: { type: 'Point', coordinates: [ -74.0060152, 40.7127281 ] },
    isTrending: false,
    category: 'rooms'
  },
  {
    title: 'Mountain Retreat',
    description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 1000,
    location: 'Aspen',
    country: 'United States',
    geometry: { type: 'Point', coordinates: [ -106.82356, 39.1911128 ] },
    category: 'mountain',
    isTrending: false
  },
  {
    title: 'Historic Villa in Tuscany',
    description: 'Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.',
    image: {
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 2500,
    location: 'Florence',
    country: 'Italy',
    geometry: { type: 'Point', coordinates: [ 11.2556404, 43.7697955 ] },
    category: 'castle',
    isTrending: true
  },
  {
    title: 'Secluded Treehouse Getaway',
    description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: {
      url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 800,
    location: 'Portland',
    country: 'United States',
    geometry: { type: 'Point', coordinates: [ -122.674194, 45.5202471 ] },
    category: 'dome',
    isTrending: false
  },
  {
    title: 'Beachfront Paradise',
    description: 'Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.',
    image: {
      url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 2000,
    location: 'Cancun',
    country: 'Mexico', 
    geometry: { type: 'Point', coordinates: [ -86.8425761, 21.1527467 ] },
    category: 'beach',
    isTrending: false
  },
  {
    title: 'Rustic Cabin by the Lake',
    description: 'Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.',
    image: {
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 900,
    location: 'Lake Tahoe',
    country: 'United States',
    geometry: { type: 'Point', coordinates: [ -120.0503528, 39.0885405 ] },
    category: 'camping',
    isTrending: false
  },
  {
    title: 'Luxury Penthouse with City Views',
    description: 'Indulge in luxury living with panoramic city views from this stunning penthouse apartment.',
    image: {
      url: 'https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 3500,
    location: 'Los Angeles',
    country: 'United States',
    geometry: { type: 'Point', coordinates: [ -118.242766, 34.0536909 ] },
    isTrending: true,
    category: 'rooms'
  },
  {
    title: 'Ski-In/Ski-Out Chalet',
    description: 'Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.',
    image: {
      url: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 3000,
    location: 'Verbier',
    country: 'Switzerland',
    geometry: { type: 'Point', coordinates: [ 7.2286765, 46.0961011 ] },
    category: 'arctic',
    isTrending: true
  },
  {
    title: 'Safari Lodge in the Serengeti',
    description: 'Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.',
    image: {
      url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 4000,
    location: 'Serengeti National Park',
    country: 'Tanzania',
    geometry: { type: 'Point', coordinates: [ 34.6983828, -2.3712909 ] },
    category: 'camping',
    isTrending: true
  },
  {
    title: 'Historic Canal House',
    description: "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    image: {
      url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 1800,
    location: 'Amsterdam',
    country: 'Netherlands',
    geometry: { type: 'Point', coordinates: [ 4.8924534, 52.3730796 ] },
    category: 'cities',
    isTrending: false
  },
  {
    title: 'Private Island Retreat',
    description: 'Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.',
    image: {
      url: 'https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 10000,
    location: 'Fiji',
    country: 'Fiji',
    geometry: { type: 'Point', coordinates: [ 179.0122737, -18.1239696 ] },
    isTrending: true,
    category: 'beach'
  },
  {
    title: 'Charming Cottage in the Cotswolds',
    description: 'Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.',
    image: {
      url: 'https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 1200,
    location: 'Cotswolds',
    country: 'United Kingdom',
    geometry: { type: 'Point', coordinates: [ -0.2303335, 51.7489426 ] },
    isTrending: false,
    category: 'farm'
  },
  {
    title: 'Historic Brownstone in Boston',
    description: 'Step back in time in this elegant historic brownstone located in the heart of Boston.',
    image: {
      url: 'https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 2200,
    location: 'Boston',
    country: 'United States',
    geometry: { type: 'Point', coordinates: [ -71.0578303, 42.3588336 ] },
    isTrending: true,
    category: 'cities'
  },
  {
    title: 'Beachfront Bungalow in Bali',
    description: 'Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.',
    image: {
      url: 'https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 1800,
    location: 'Bali',
    country: 'Indonesia',
    geometry: { type: 'Point', coordinates: [ 115.1919203, -8.2271303 ] },
    category: 'beach',
    isTrending: false
  },
  {
    title: 'Mountain View Cabin in Banff',
    description: 'Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.',
    image: {
      url: 'https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 1500,
    location: 'Banff',
    country: 'Canada',
    geometry: { type: 'Point', coordinates: [ -115.5720773, 51.175076 ] },
    category: 'camping',
    isTrending: false
  },
  {
    title: 'Art Deco Apartment in Miami',
    description: 'Step into the glamour of the 1920s in this stylish Art Deco apartment in South Beach.',
    image: {
      url: 'https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 1600,
    location: 'Miami',
    country: 'United States',
    geometry: { type: 'Point', coordinates: [ -80.1935973, 25.7741566 ] },
    isTrending: false,
    category: 'rooms'
  },
  {
    title: 'Tropical Villa in Phuket',
    description: 'Escape to a tropical paradise in this luxurious villa with a private infinity pool in Phuket.',
    image: {
      url: 'https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 3000,
    location: 'Phuket',
    country: 'Thailand',
    geometry: { type: 'Point', coordinates: [ 98.3529292, 7.9366015 ] },
    category: 'pool',
    isTrending: true
  },
  {
    title: 'Historic Castle in Scotland',
    description: 'Live like royalty in this historic castle in the Scottish Highlands. Explore the rugged beauty of the area.',
    image: {
      url: 'https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYWNoJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 4000,
    location: 'Scottish Highlands',
    country: 'United Kingdom',
    geometry: { type: 'Point', coordinates: [ -5, 56.8 ] },
    category: 'castle',
    isTrending: true
  },
  {
    title: 'Desert Oasis in Dubai',
    description: 'Experience luxury in the middle of the desert in this opulent oasis in Dubai with a private pool.',
    image: {
      url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 5000,
    location: 'Dubai',
    country: 'United Arab Emirates',
    geometry: { type: 'Point', coordinates: [ 55.1885387, 25.0742823 ] },
    category: 'pool',
    isTrending: true
  }
];

module.exports = { data: sampleListings };
