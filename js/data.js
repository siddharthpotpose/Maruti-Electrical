/* ============================================================
   Maruti Electrical - data.js
   EDIT HERE: shop details + products + prices.
   ============================================================ */
const SITE = {
  name: 'Maruti Electrical',
  whatsapp: '918839767636',      // country code 91 + number
  phoneDisplay: '+91 84858 96373',
  freeDeliveryAbove: 999,        // free delivery above this amount (Rs)
  deliveryFee: 49
};

const CATEGORIES = [
  { id: 'switches', name: 'Modular Switches', icon: 'fa-toggle-on', img: 'switch-red-1', text: 'Premium plates in red, gold & wood finish' },
  { id: 'sockets',  name: 'Sockets & Regulators', icon: 'fa-plug', img: 'socket-wood-1', text: 'Universal sockets and fan regulators' },
  { id: 'lighting', name: 'LED Lighting', icon: 'fa-lightbulb', img: 'tubelight-2', text: 'Tubelights, panel lights and smart bulbs' }
];

/* imgs = file names inside images/products/ (3-4 per product) */
const PRODUCTS = [
  {
    id: 'switch-red', cat: 'switches', name: 'Modular Switch - Ruby Red Finish', price: 149, mrp: 199, rating: 4.6, reviews: 128, badge: 'Best Seller',
    imgs: ['switch-red-1', 'switch-red-2', 'switch-red-3'],
    short: 'Slim red plate with brushed-silver rocker. 6A one-way switch.',
    desc: 'A stylish 1-module modular switch with a ruby red plate and silver frame. Smooth, soft-click rocker action gives a premium feel and long life. Fits standard modular boxes, so replacing old switches is easy.',
    specs: { 'Type': '1 Module Switch (One Way)', 'Rating': '6A, 240V AC', 'Finish': 'Ruby Red with Silver Frame', 'Material': 'Fire-retardant polycarbonate', 'Fitting': 'Standard modular box', 'Warranty': '1 Year' }
  },
  {
    id: 'switch-indicator', cat: 'switches', name: 'Modular Switch with Indicator - Ruby Red', price: 189, mrp: 249, rating: 4.5, reviews: 86, badge: 'New',
    imgs: ['switch-indicator-1', 'switch-indicator-2', 'switch-indicator-3'],
    short: 'Red plate switch with a glowing indicator, easy to find in the dark.',
    desc: 'Same premium red finish with a built-in indicator light so you can spot the switch in the dark. Ideal for bedrooms, corridors and bathrooms.',
    specs: { 'Type': '1 Module Switch with Indicator', 'Rating': '6A / 16A, 240V AC', 'Finish': 'Ruby Red with Silver Frame', 'Material': 'Fire-retardant polycarbonate', 'Fitting': 'Standard modular box', 'Warranty': '1 Year' }
  },
  {
    id: 'switch-gold', cat: 'switches', name: 'Modular Switch - Champagne Gold', price: 159, mrp: 219, rating: 4.7, reviews: 142, badge: 'Premium',
    imgs: ['switch-gold-1', 'switch-gold-2', 'switch-gold-3'],
    short: 'Elegant champagne gold plate that suits every modern interior.',
    desc: 'Champagne gold finish with a silver rocker adds a luxury look to living rooms and bedrooms. Durable body, smooth action and clean edges.',
    specs: { 'Type': '1 Module Switch (One Way)', 'Rating': '6A, 240V AC', 'Finish': 'Champagne Gold', 'Material': 'Fire-retardant polycarbonate', 'Fitting': 'Standard modular box', 'Warranty': '1 Year' }
  },
  {
    id: 'switch-wood', cat: 'switches', name: 'Modular Switch - Walnut Wood Finish', price: 169, mrp: 229, rating: 4.4, reviews: 61,
    imgs: ['switch-wood-1', 'switch-wood-2', 'switch-wood-3'],
    short: 'Warm wood-grain plate for a classy, natural look.',
    desc: 'Walnut wood-grain finish plate with a metallic rocker. Perfect for wooden interiors, offices and showrooms.',
    specs: { 'Type': '1 Module Switch (One Way)', 'Rating': '6A, 240V AC', 'Finish': 'Walnut Wood Grain', 'Material': 'Fire-retardant polycarbonate', 'Fitting': 'Standard modular box', 'Warranty': '1 Year' }
  },
  {
    id: 'socket-wood', cat: 'sockets', name: 'Universal Multi-Pin Socket - Wood Finish', price: 249, mrp: 329, rating: 4.6, reviews: 97, badge: 'Popular',
    imgs: ['socket-wood-1', 'socket-wood-2', 'socket-wood-3'],
    short: 'Universal socket that accepts 2-pin, 3-pin and international plugs.',
    desc: 'Multi-pin universal socket with shuttered safety design. Use Indian and international plugs without adaptors. Wood-grain plate matches modern interiors.',
    specs: { 'Type': 'Universal Multi-Pin Socket', 'Rating': '6A / 16A, 240V AC', 'Finish': 'Wood Grain with Dark Frame', 'Safety': 'Shuttered, child safe', 'Fitting': 'Standard modular box', 'Warranty': '1 Year' }
  },
  {
    id: 'fan-regulator', cat: 'sockets', name: 'Fan Regulator - Rotary Knob, Ruby Red', price: 229, mrp: 299, rating: 4.5, reviews: 74,
    imgs: ['fan-regulator-1', 'fan-regulator-2', 'fan-regulator-3'],
    short: 'Smooth rotary fan speed regulator with ON/OFF indicator.',
    desc: 'Rotary fan regulator for smooth, step-less speed control with a red ON indicator. Silver knob on a ruby red plate matches the Maruti modular range.',
    specs: { 'Type': 'Rotary Fan Regulator', 'Rating': '240V AC', 'Finish': 'Ruby Red with Silver Knob', 'Indicator': 'Red LED', 'Fitting': 'Standard modular box', 'Warranty': '1 Year' }
  },
  {
    id: 'tubelight', cat: 'lighting', name: 'T5 Adventa LED Batten Tubelight', price: 349, mrp: 499, rating: 4.7, reviews: 210, badge: 'Top Rated',
    imgs: ['tubelight-1', 'tubelight-2', 'tubelight-3'],
    short: 'Slim T5 batten tubelight, 100-110 lm/W, 25000 hours life.',
    desc: 'Energy-saving T5 batten tubelight with polycarbonate housing. Photobiologically safe LEDs, no UV/IR radiation, no mercury, instant light and low running temperature.',
    specs: { 'Series': 'Batten - Tubelight (T-5 Adventa)', 'Efficacy': '100-110 lm/W', 'Input Voltage': '220-240V AC', 'CRI': '> 80', 'Surge Protection': 'Up to 4kV', 'Life': '25000 hours', 'Housing': 'Polycarbonate', 'Operating Temp.': '-10 C to +45 C' }
  },
  {
    id: 'panel', cat: 'lighting', name: 'Orion Backlit LED Panel Light', price: 449, mrp: 649, rating: 4.6, reviews: 158, badge: '30% OFF',
    imgs: ['panel-1', 'panel-2'],
    short: 'Round / square backlit panel for false ceilings, 25000 hours.',
    desc: 'Orion & Orion New Backlit panels give even, glare-free light for false ceilings. Mercury-free, instant on, with 4kV surge protection and long life.',
    specs: { 'Series': 'Orion & Orion New Backlit', 'Efficacy': '100-110 lm/W', 'Input Voltage': '220-240V AC', 'CRI': '> 80', 'Surge Protection': 'Up to 4kV', 'Life': '25000 hours', 'Shapes': 'Round and Square' }
  },
  {
    id: 'bulb', cat: 'lighting', name: 'Handsome Senso Motion Sensor LED Bulb', price: 199, mrp: 299, rating: 4.5, reviews: 119, badge: 'New',
    imgs: ['bulb-1', 'bulb-2', 'bulb-3'],
    short: 'Smart bulb that turns on with movement and off after 30 seconds.',
    desc: 'Handsome SENSO bulb lights up when it senses movement within 5 m and switches off after 30 seconds of no movement. Saves up to 85% energy compared to traditional incandescent bulbs and has eye-comfort technology.',
    specs: { 'Series': 'Bulb Series - Handsome Senso', 'Sensing Range': 'Within 5 m', 'Auto Off': 'After 30 seconds', 'CRI': '> 80', 'Surge Protection': 'Up to 4kV', 'Life': '25000 hours', 'Energy Saving': 'Up to 85%' }
  }
];
